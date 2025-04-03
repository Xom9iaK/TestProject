const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const terser = require('gulp-terser')

function styles() {
	return src('src/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'src/js/main.js',
		'src/js/slider.js',
		'src/js/video.js',


	])
		.pipe(terser())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('src/img/**/*').pipe(imagemin()).pipe(dest('dist/img'))
}

function html() {
	return src('src/index.html').pipe(dest('dist')).pipe(browserSync.stream())
}

function serve() {
	browserSync.init({
		server: './dist',
		notify: false,
	})

	watch('src/scss/**/*.scss', styles)
	watch('src/js/**/*.js', scripts)
	watch('src/*.html', html)
	watch('src/img/**/*', images)
}

exports.build = series(html, images, scripts, styles)
exports.default = series(html, images, scripts, styles, serve)
