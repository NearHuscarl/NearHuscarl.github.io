const shell = require('shelljs');
const fs = require('fs');
const { promisify } = require('util');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const server = require('./server.js');
const config = require('./desktop-config.js');

const writeFileAsync = promisify(fs.writeFile);

function launchChromeAndRunLighthouse(url, opts, config = null) {
	return chromeLauncher
		.launch({ chromeFlags: opts.chromeFlags })
		.then((chrome) => {
			opts.port = chrome.port;
			return lighthouse(url, opts, config).then((results) => {
				// use results.lhr for the JS-consumable output
				// https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
				// use results.report for the HTML/JSON/CSV output as a string
				// use results.artifacts for the trace/screenshots/other specific case you need (rarer)
				return chrome.kill().then(() => results.lhr);
			});
		});
}

// https://shields.io/endpoint
function getColor(score) {
	if (score < 0.5) {
		return 'red';
	}
	if (score >= 0.5 && score < 0.6) {
		return 'orange';
	}
	if (score >= 0.6 && score < 0.7) {
		return 'yellow';
	}
	if (score >= 0.7 && score < 0.8) {
		return 'yellowgreen';
	}
	if (score >= 0.8 && score < 0.9) {
		return 'green';
	}
	if (score >= 0.9 && score <= 1) {
		return 'brightgreen';
	}
	return 'red';
}
async function createBadgeConfig({ id, title, score }) {
	const configPath = `audit/${id}.json`;
	const config = {
		schemaVersion: 1,
		label: title,
		message: score.toString(),
		color: getColor(score),
	};

	await writeFileAsync(configPath, JSON.stringify(config), (err) => {
		if (err) {
			return console.log(err);
		}
		return '';
	});
}

const opts = {
	chromeFlags: [],
};
async function execAuditing() {
	await new Promise((resolve) => server.listen('9000', resolve));
	console.log('App is listening on port 9000');

	await launchChromeAndRunLighthouse(
		'http://localhost:9000',
		opts,
		config,
	).then(async (results) => {
		const categories = Object.keys(results.categories);

		for (const category of categories) {
			await createBadgeConfig(results.categories[category]);
		}

		await new Promise((resolve) => server.close(resolve));
	});
}

async function main() {
	shell.exec('yarn build');
	await execAuditing();
}

main();
