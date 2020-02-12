/** @type {LH.Config.Json} */
const config = {
	extends: 'lighthouse:default',
	settings: {
		maxWaitForFcp: 15 * 1000,
		maxWaitForLoad: 35 * 1000,
		emulatedFormFactor: 'desktop',
		throttling: {
			// Using a "broadband" connection type
			// Corresponds to "Dense 4G 25th percentile" in https://docs.google.com/document/d/1Ft1Bnq9-t4jK5egLSOc28IL4TvR-Tt0se_1faTA4KTY/edit#heading=h.bb7nfy2x9e5v
			rttMs: 40,
			throughputKbps: 10 * 1024,
			cpuSlowdownMultiplier: 1,
		},
		// Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
		skipAudits: ['uses-http2'],
	},
};

module.exports = config;
