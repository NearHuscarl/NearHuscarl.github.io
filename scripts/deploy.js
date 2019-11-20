/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require('shelljs');
const has = require('lodash/has');
// eslint-disable-next-line import/no-extraneous-dependencies
const ghpages = require('gh-pages');

if (!has(process, 'env.npm_config_M')) {
	console.error('----------ERROR----------');
	console.error('Missing commit message');
	console.error('Please add a commit message like this:');
	// Use npm instead of yarn because up until now (20/11/2019)
	// yarn does not support passing arguments to npm script
	console.error("npm run deploy --M='your commit message'");
} else {
	const commitMessage = process.env.npm_config_M;

	// push and deploy on gh-page branch
	ghpages.publish('dist', {
		message: commitMessage,
	});

	// push source code to master branch
	shell.exec(`git commit -m "${commitMessage}"`);
	shell.exec('git push');
}
