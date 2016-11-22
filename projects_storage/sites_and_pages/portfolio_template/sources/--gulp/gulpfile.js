/**********

Install gulp and plugins:

npm init
npm install -g gulp
npm install --save-dev gulp
npm i gulp-jade gulp-sass gulp-concat gulp-autoprefixer gulp-clean-css gulp-uglify gulp-rename --save-dev

**********/



// Set gulp and pligins

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename");



///// Jade /////

	// Compile Jade
	gulp.task('jadeIndex', function(){
		gulp.src(['../pages/index.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('../../assembled/'))
	});

	gulp.task('jadePages', function(){
	 gulp.src(['../pages/*.jade', '!../pages/index.jade'])
	  .pipe(jade({
			pretty: true
		}))
	  .pipe(gulp.dest('../../assembled/pages'))
	});

///// Jade end /////



///// Live reload //////


	


///// Live reload end //////



///// Styles /////

	// Concatenate Sass

	// Common
	gulp.task('concatCommon', function() {
		return gulp.src([
			'../styles/vendor/**/*.sass',
			'../styles/base/variables/**/*.sass',
			'../styles/base/common/**/*.sass',
			'../styles/layout/common/**/*.sass',
			'../styles/module/common/**/*.sass',
			'../styles/pages/common/**/*.sass',
			'../styles/state/common/**/*.sass',
			])
		.pipe(concat('common.sass'))
		.pipe(gulp.dest('../styles/concatenate'));
	});

	// Responsive
	gulp.task('concatResponsive', ['concatCommon'], function() {
		return gulp.src([
			'../styles/base/responsive/**/*.sass',
			'../styles/layout/responsive/**/*.sass',
			'../styles/module/responsive/**/*.sass',
			'../styles/pages/responsive/**/*.sass',
			'../styles/state/responsive/**/*.sass',
			])
		.pipe(concat('responsive.sass'))
		.pipe(gulp.dest('../styles/concatenate'));
	});

	// Common and responsive to one file
	gulp.task('concatBoth', ['concatCommon', 'concatResponsive'], function() {
		return gulp.src([
			'../styles/concatenate/common.sass',
			'../styles/concatenate/responsive.sass'
		])
		.pipe(concat('concatenate.sass'))
		.pipe(gulp.dest('../styles/concatenate'));
	});


	// Compile Sass
	gulp.task('sassCompile', ['concatBoth'], function () {
		return gulp.src('../styles/concatenate/concatenate.sass')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(rename('min.css'))
	    .pipe(gulp.dest('../../assembled/assets/styles'));
	});

	// Compress css
	gulp.task('сompressStyles', ['sassCompile'], function() {
	  	return gulp.src('../../assembled/assets/styles/**/*.css')
	    .pipe(cleanCSS({compatibility: 'ie8', processImport: false}))
	    .pipe(gulp.dest('../../assembled/assets/styles'));
	});

	// Set prefixes

	gulp.task('prefixStyles', ['сompressStyles'], function(){
    gulp.src('../../assembled/assets/styles/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../../assembled/assets/styles/'))
	}
	);

///// Styles end /////



///// Scripts /////

	// Concatenate
	gulp.task('concatJS', function() {
		return gulp.src([
			'../scripts/vendor/**/*.js',
			'../scripts/common/**/*.js',
			'../scripts/pages/**/*.js',
			])
		.pipe(concat('concatenate.js'))
		.pipe(gulp.dest('../scripts'));
	});

	// Compress
	gulp.task('compressJS', ['concatJS'], function() {
		return gulp.src('../scripts/concatenate.js')
		.pipe(rename('min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('../../assembled/assets/scripts'));
	});

///// Scripts end /////



///// Watching for changes /////

gulp.task('watch', function() {
	gulp.watch('../pages/**/*.jade', ['jadeIndex', 'jadePages']);
	gulp.watch('../styles/**/*.sass', [
		'concatCommon',
		'concatResponsive',
		'concatBoth',
		'sassCompile',
		'сompressStyles'
	]);
	gulp.watch('../../assembled/assets/styles/**/*.*', ['prefixStyles']);
	gulp.watch('../scripts/**/*.js', ['concatJS', 'compressJS']);
});