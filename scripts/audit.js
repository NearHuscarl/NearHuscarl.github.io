/* eslint-disable import/no-extraneous-dependencies */
const shell = require('shelljs');
const fs = require('fs');
const { promisify } = require('util');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const desktopConfig = require('./desktop-config.js');

const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);

function removeFilenameExtension(path) {
	return path.replace(/\.[^/.]+$/, '');
}
function trimTrailing0(uglyFloat) {
	return parseFloat(uglyFloat.toFixed(2));
}

async function getRoutes() {
	const files = await readdirAsync('src/pages');
	return files.map((file) => {
		if (file.startsWith('index')) return '/';
		return '/' + removeFilenameExtension(file);
	});
}

async function writeFile(path, content) {
	await writeFileAsync(path, content, (err) => {
		if (err) {
			return console.error(err);
		}
		return '';
	});
}

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
				return chrome.kill().then(() => results);
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

const opts = {
	output: 'html',
	chromeFlags: [],
};
async function execAuditing(route) {
	return launchChromeAndRunLighthouse(
		`http://near.netlify.com${route}`,
		opts,
		desktopConfig,
	).then((results) => {
		const { lhr, report } = results;
		const scoreReport = {};

		Object.keys(lhr.categories).forEach((category) => {
			const { id, title, score } = lhr.categories[category];
			scoreReport[id] = { title, score };
		});

		if (route === '/') {
			writeFile('audit/report.html', report);
		} else {
			writeFile(`audit/report-${route.replace(/^\//, '')}.html`, report);
		}
		return scoreReport;
	});
}

async function main() {
	// shell.exec('yarn build');

	const routes = await getRoutes();
	const reports = {};

	// eslint-disable-next-line no-restricted-syntax
	for (const route of routes) {
		// if we don't await, all of the chrome browsers will launch for each route at the same time
		// eslint-disable-next-line no-await-in-loop
		reports[route] = await execAuditing(route);
	}

	const scores = {};
	const categoryIds = Object.keys(reports['/']);

	categoryIds.forEach((categoryId) => {
		scores[categoryId] = 0;
	});
	routes.forEach((route) => {
		const report = reports[route];

		categoryIds.forEach((categoryId) => {
			scores[categoryId] += report[categoryId].score;
		});
	});

	categoryIds.forEach((categoryId) => {
		const configPath = `audit/${categoryId}.json`;
		const score = scores[categoryId];
		const badgeConfig = {
			schemaVersion: 1,
			label: reports['/'][categoryId].title,
			message: trimTrailing0(score / routes.length).toString(),
			color: getColor(score),
		};

		writeFile(configPath, JSON.stringify(badgeConfig));
	});
}

main();
