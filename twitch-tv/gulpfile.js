const gulp       = require('gulp');
const uglifyCss  = require('gulp-clean-css');
const uglifyJs   = require('gulp-uglify-es').default;
const lintScss   = require('gulp-scss-lint');
const lintJs     = require('gulp-eslint');
const sass       = require('gulp-sass');
const imagemin   = require('gulp-imagemin');
const newer      = require('gulp-newer');
// const concat     = require('gulp-concat');
const rename     = require('gulp-rename');
const debug      = require('gulp-debug');
const livereload = require('gulp-livereload');

let path = {
	src: {
		all:       'src/**/*',
		image:     'src/**/*.{jpg,png}',
		scssEntry: 'src/scss/main.scss',
		scss:      'src/scss/*.scss',
		css:       'src/css/',
		html:      'src/**/*.html',
		js:        'src/**/*.js'
	},
	dist: {
		all:   'dist/',
		image: 'dist/',
		scss:  'dist/',
		css:   'dist/css/',
		html:  'dist/',
		js:    'dist/'
	}
};

// scss: lint, compile, minify
// js:   lint, webpack(?), minify
// image: minify
// html: move to dist
// default: scss js image html (newer)
gulp.task('scss', () => {
	return gulp.src(path.src.scssEntry)
		.pipe(newer({
			dest: path.src.scss,
			extra: path.src.scss
		}))
		.pipe(lintScss())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.src.css))
		.pipe(rename(file => {
			file.extname = '.min.css';
		}))
		.pipe(uglifyCss())
		.pipe(debug({ title: 'after sass' }))
		.pipe(gulp.dest(path.dist.css));
});

gulp.task('js', () => {
	return gulp.src(path.src.js)
		.pipe(lintJs())
		.pipe(lintJs.format())
		.pipe(newer(path.dist.js))
		.pipe(uglifyJs())
		.pipe(gulp.dest(path.dist.js));
});

gulp.task('image', () => {
	return gulp.src(path.src.image)
		.pipe(newer(path.dist.image))
		.pipe(imagemin())
		.pipe(gulp.dest(path.dist.image));
});

gulp.task('html', () => {
	return gulp.src(path.src.html)
		.pipe(newer(path.dist.html))
		.pipe(gulp.dest(path.dist.html));
});

gulp.task('livereload', () => {
	return gulp.src(path.src.all)
		.pipe(livereload({ start: true }));
});

gulp.task('watch-html', () => {
	gulp.watch(path.src.html, ['html']);
	gulp.watch(path.dist.html).on('change', event => {
		logEvent(event);
	});
});

gulp.task('watch-scss', () => {
	gulp.watch(path.src.scss, ['scss']);
	gulp.watch(path.dist.scss).on('change', event => {
		logEvent(event);
	});
});

gulp.task('watch-js', () => {
	gulp.watch(path.src.js, ['js']);
	gulp.watch(path.dist.js).on('change', event => {
		logEvent(event);
	});
});

gulp.task('watch-image', () => {
	gulp.watch(path.src.image, ['image']);
	gulp.watch(path.dist.image).on('change', event => {
		logEvent(event);
	});
});

gulp.task('build', ['html', 'scss', 'js', 'image']);
gulp.task('watch', ['watch-html', 'watch-scss', 'watch-js', 'watch-image']);
gulp.task('default', ['watch']);

// --- Misc Functions ---
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
let color = {
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	cyan: '\x1b[36m',
	reset: '\x1b[0m'
};
let cwd = process.cwd();

function logEvent(event) {
	let fileName = event.path.split('/').pop();
	let replaceRegex = new RegExp('(' + cwd + '|' + fileName + ')', 'g');
	let fileParent = event.path.replace(replaceRegex, '');
	let eventType = formatEventType(event.type);
	let colorCode = getColorCode(event.type);

	console.log(colorCode, '[', eventType, '] ' + fileParent, fileName);
}

function formatEventType(eventType) {
	if (eventType === 'changed') {
		return 'MODIFIED';
	}
	else if (eventType === 'added') {
		return ' ADDED  ';
	}
	else if (eventType === 'deleted') {
		return 'DELETED ';
	}
	return 1;
}

function getColorCode(eventType) {
	if (eventType === 'changed') {
		return '%s' + color.yellow + '%s' + color.reset + '%s' + color.cyan + '%s' + color.reset;
	}
	else if (eventType === 'added') {
		return '%s' + color.green + '%s' + color.reset + '%s' + color.cyan + '%s' + color.reset;
	}
	else if (eventType === 'deleted') {
		return '%s' + color.red + '%s' + color.reset + '%s' + color.cyan + '%s' + color.reset;
	}
	return 1;
}
