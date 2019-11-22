// Documents: https://www.sejda.com/developers#html-pdf-api-options
// Free account: 30 request per hour

// yarn add request
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('request');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

dotenv.config({ path: '.api_keys' });

const apiKey = process.env.SEJDA_API_KEY;
const viewportWidth = 1000;

const opts = {
	uri: 'https://api.sejda.com/v2/html-pdf',
	headers: {
		Authorization: 'Token: ' + apiKey,
	},
	json: {
		url: 'https://nearhuscarl.github.io/portfolio/resume-full',
		viewportWidth,
	},
};

let name = './resume.pdf';
let counter = 0;
let outputPath = path.join(__dirname, name);

while (fs.existsSync(outputPath)) {
	counter += 1;
	name = `./resume_${counter}.pdf`;
	outputPath = path.join(__dirname, name);
}

request
	.post(opts)
	.on('error', (err) => console.error(err))
	.on('response', (response) => {
		if (response.statusCode === 200) {
			response
				.pipe(fs.createWriteStream(outputPath))
				.on('finish', () => console.log('PDF saved to disk'));
		} else {
			console.error('Got code: ' + response.statusCode);
		}
	});
