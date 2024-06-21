const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

const SITE_CODE = "CASKR"; // Change this to configure the radar site
const RADAR_URL = `https://climate.weather.gc.ca/radar/index_e.html?site=${SITE_CODE}&duration=2`;
const UPDATE_INTERVAL = 3 * 60 * 1000; // 3 minutes
const dir = "./images";

const updateRadar = async (url) => {
  // clear the directory first
  fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`));

  try {
    const resp = await axios.get(url);
    const dom = new JSDOM(resp.data);
    const scripts = dom.window.document.getElementsByTagName("script");
    for (let script of scripts) {
      if (script.innerHTML.includes("imageArray")) {
        const start = script.innerHTML.indexOf("imageArray = [");
        const end = script.innerHTML.indexOf("];", start);
        const imageArrayString = script.innerHTML.substring(start, end + 2);
        const regex = /imageArray = \[(.*)\]/gs;
        const match = imageArrayString.match(regex);
        if (match && !match[0]?.includes("imageArray = []")) {
          const imageArray = match[0]
            .replace(/imageArray = \[/gi, "")
            .split("',")
            .map((str) => str.trim().replace(/^'data:image\/gif;base64,/, ""))
            .filter((str) => str);

          imageArray.forEach((imageString, ix) => {
            if (imageString?.length > 10) {
              fs.writeFile(`${dir}/${`${ix + 1}`.padStart(3, "0")}_radar.gif`, imageString, "base64", function (err) {
                if (err) console.error(err);
              });
            }
          });
          console.log("Finished updating radar images at", new Date().toISOString());
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Initial update
updateRadar(RADAR_URL);
// Set interval for updates
setInterval(() => updateRadar(RADAR_URL), UPDATE_INTERVAL);
