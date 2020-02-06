/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const shell = require('shelljs');
const fs = require('fs');
const fetch = require('node-fetch');
const { promisify } = require('util');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const desktopConfig = require('./desktop-config.js');

const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const appendFileAsync = promisify(fs.appendFile);

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

function getHtmlReportFile(route) {
	if (route === '/') {
		return 'report.html';
	}
	return `report-${route.replace(/^\//, '')}.html`;
}

async function execAuditing(route) {
	const opts = { output: 'html', chromeFlags: [] };

	return launchChromeAndRunLighthouse(
		`https://near.netlify.com${route}`,
		opts,
		desktopConfig,
	).then((results) => {
		const { lhr, report } = results;
		const scoreReport = {};

		Object.keys(lhr.categories).forEach((category) => {
			const { id, title, score } = lhr.categories[category];
			scoreReport[id] = { title, score };
		});

		writeFile(`audit/${getHtmlReportFile(route)}`, report);
		return scoreReport;
	});
}

// calculate average scores for each category from all routes
// and update the config files to display the badges
function getAverageScores(reports) {
	const routes = Object.keys(reports);
	const scores = {};
	const categoryIds = Object.keys(reports['/']);

	categoryIds.forEach((categoryId) => {
		scores[categoryId] = {
			score: 0,
			title: reports['/'][categoryId].title,
		};
	});
	routes.forEach((route) => {
		const report = reports[route];

		categoryIds.forEach((categoryId) => {
			scores[categoryId].score += report[categoryId].score;
		});
	});

	categoryIds.forEach((categoryId) => {
		scores[categoryId].score /= routes.length;
	});

	return scores;
}

function getEmoij(title) {
	if (title === 'Accessibility') {
		return ':wheelchair:';
	}
	if (title === 'Best Practices') {
		return ':heavy_check_mark:';
	}
	if (title === 'Performance') {
		return ':zap:';
	}
	if (title === 'Progressive Web App') {
		return ':iphone:';
	}
	if (title === 'SEO') {
		return ':loudspeaker:';
	}
	return '';
}

async function updateAuditReadme(reports, avgScores) {
	const routes = Object.keys(reports).sort((a, b) => {
		// index first, 404 last, the rest is in alphabetical ordered
		if (a === '/') return -1;
		if (b === '/') return 1;
		if (a === '/404') return 1;
		if (b === '/404') return -1;
		return a > b;
	});
	const categories = Object.keys(reports[routes[0]]).sort();
	const rootUrl = 'near.netlify.com';
	const readmePath = 'audit/README.md';
	const append = (line) => appendFileAsync(readmePath, line + '\n');

	// clear old content
	writeFileAsync(readmePath, '');

	await append('# Lighthouse Reports');
	await append('');

	const siteId = '6463a76d-ab2e-41df-8383-fd816f82e3ba';
	const deployInfo = await fetch(
		`https://api.netlify.com/api/v1/sites/${siteId}`,
	)
		.then((res) => res.json())
		.then((json) => json.published_deploy);
	const commitRef = deployInfo.commit_ref.substring(0, 7);
	const commitUrl = deployInfo.commit_url;
	await append(`Reported at commit [\`${commitRef}\`](${commitUrl})`);
	await append('');

	for (const route of routes) {
		const url = rootUrl + route.replace(/^\/$/, '');

		await append(`## [\`${url}\`](https://${url})`);
		await append('');
		await append('| Category | Score |');
		await append('|----------|------:|');

		for (const category of categories) {
			const { title, score } = reports[route][category];
			await append(`| ${title} | ${score * 100} |`);
		}
		await append('');
		await append(
			`:page_with_curl: [Full Report](https://htmlpreview.github.io/?https://github.com/NearHuscarl/portfolio/blob/master/audit/${getHtmlReportFile(
				route,
			)})`,
		);
		await append('');
	}

	await append('## Average Score');
	await append('');
	await append('| Category | Score |');
	await append('|----------|------:|');

	for (const category of categories) {
		const { title, score } = avgScores[category];
		const name = `${getEmoij(title)} ${title}`;
		await append(`| ${name} | ${trimTrailing0(score * 100).toString()} |`);
	}
	await append('');
}

async function main() {
	shell.exec('yarn build');

	const routes = await getRoutes();
	const reports = {};

	for (const route of routes) {
		// if we don't await, all of the chrome browsers will launch for each route at the same time
		reports[route] = await execAuditing(route);
	}

	// Uncomment to quickly debug
	// const reports = {
	// 	'/404': {
	// 		performance: { title: 'Performance', score: 1 },
	// 		accessibility: { title: 'Accessibility', score: 0.94 },
	// 		'best-practices': { title: 'Best Practices', score: 0.92 },
	// 		seo: { title: 'SEO', score: 1 },
	// 		pwa: { title: 'Progressive Web App', score: 0.65 },
	// 	},
	// 	'/about': {
	// 		performance: { title: 'Performance', score: 1 },
	// 		accessibility: { title: 'Accessibility', score: 0.94 },
	// 		'best-practices': { title: 'Best Practices', score: 0.92 },
	// 		seo: { title: 'SEO', score: 1 },
	// 		pwa: { title: 'Progressive Web App', score: 0.65 },
	// 	},
	// 	'/': {
	// 		performance: { title: 'Performance', score: 1 },
	// 		accessibility: { title: 'Accessibility', score: 0.95 },
	// 		'best-practices': { title: 'Best Practices', score: 0.92 },
	// 		seo: { title: 'SEO', score: 1 },
	// 		pwa: { title: 'Progressive Web App', score: 0.65 },
	// 	},
	// 	'/resume-full': {
	// 		performance: { title: 'Performance', score: 1 },
	// 		accessibility: { title: 'Accessibility', score: 0.94 },
	// 		'best-practices': { title: 'Best Practices', score: 0.92 },
	// 		seo: { title: 'SEO', score: 1 },
	// 		pwa: { title: 'Progressive Web App', score: 0.65 },
	// 	},
	// 	'/resume': {
	// 		performance: { title: 'Performance', score: 1 },
	// 		accessibility: { title: 'Accessibility', score: 0.94 },
	// 		'best-practices': { title: 'Best Practices', score: 0.92 },
	// 		seo: { title: 'SEO', score: 1 },
	// 		pwa: { title: 'Progressive Web App', score: 0.65 },
	// 	},
	// };
	const categoryIds = Object.keys(reports['/']);
	const avgScores = getAverageScores(reports);

	categoryIds.forEach((categoryId) => {
		const configPath = `audit/${categoryId}.json`;
		const { title, score } = avgScores[categoryId];
		const badgeConfig = {
			schemaVersion: 1,
			label: title,
			message: trimTrailing0(score * 100).toString(),
			color: getColor(score),
		};

		writeFile(configPath, JSON.stringify(badgeConfig));
	});

	updateAuditReadme(reports, avgScores);
}

main();
