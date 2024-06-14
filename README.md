# Canada Weather Radar Image Downloader

This project is a script that downloads weather radar images from the Canada's historical weather radar web page and saves them as GIFs. This is an alternative to their API which no longer includes an overlay of boundaries, city names, etc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have Node.js installed on your machine. The project uses the following Node.js libraries:

- axios
- jsdom

You can install these packages using npm:

```bash
npm install
```

### Usage

The script is configured to download images from a specific radar site. You can change the site by modifying the `SITE_CODE` variable in the script.

The script runs indefinitely, downloading new images every 3 minutes. The images are saved in the `./images` directory.

To start the script you just need to run the following in your terminal

```
node index.js
```

## License

This project is licensed under the GNU General Public License - see the [LICENSE](./LICENSE) file for details
