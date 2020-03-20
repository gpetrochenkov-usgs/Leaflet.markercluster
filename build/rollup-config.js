
// Config file for running Rollup in "normal" mode (non-watch)

// import rollupGitVersion from 'rollup-plugin-git-version'
import json from 'rollup-plugin-json'
import alias from "@rollup/plugin-alias";
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';

// import gitRev from 'git-rev-sync'


let version = require('../package.json').version;
let release;

// Skip the git branch+rev in the banner when doing a release build
// if (process.env.NODE_ENV === 'release') {
release = true;
// } else {
// 	release = false;
// 	const branch = gitRev.branch();
// 	const rev = gitRev.short();
// 	version += '+' + branch + '.' + rev;
// }

const banner = `/*
 * markercluster ` + version + `,
 * Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 * https://github.com/gpetrochenkov-usgs/Leaflet.markercluster
 * (c) 2020, Greg Petrochenkov, USGS
 */`;

export default {
	input: 'src/index.js',
	output: {
		banner,
		file: 'dist/markercluster-src.js',
		format: 'umd',
		name: 'markercluster',
		sourcemap: true,
	},
	plugins: [
		alias({
            entries: [
                {find: 'leaflet', replacement: path.resolve(__dirname, '../node_modules/leaflet/dist/leaflet-src.esm.js')}
            ]
        }),
        commonjs(),
		json()
	],
};
