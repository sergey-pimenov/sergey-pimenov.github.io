/**********

1. npm init

2. nmp i (with current package.json)

or:

npm i gulp gulp-jade gulp-sass gulp-concat gulp-autoprefixer gulp-clean-css gulp-uglify gulp-rename --save-dev

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


// Set gulp and plugins


///// Jade /////

	// Compile Jade
	gulp.task('jadeIndex', function(){
		gulp.src(['../pages/index.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('../../assembled'))
	});

	gulp.task('jadePages', function(){
	 gulp.src(['../pages/*.jade', '!../pages/index.jade'])
	  .pipe(jade({
			pretty: true
		}))
	  .pipe(gulp.dest('../../assembled/pages'))
	});

///// Jade end /////


///// Styles /////

	// Compile Sass
	gulp.task('compileSass', function () {
		return gulp.src('../styles/main.sass')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(rename('min.css'))
	    .pipe(gulp.dest('../../assembled/assets/styles'));
	});

	// Compress styles
	gulp.task('сompressStyles', ['compileSass'], function() {
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
			'../scripts/vendors/**/*.js',
			'../scripts/modules/**/*.js',
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
	gulp.watch('../styles/**/*.{sass,scss,css}', [
		'compileSass',
		'сompressStyles',
		'prefixStyles'
	]);
	gulp.watch('../scripts/**/*.js', ['concatJS', 'compressJS']);
});

///// Watching for changes end /////