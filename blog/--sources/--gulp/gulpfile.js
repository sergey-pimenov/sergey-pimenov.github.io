/**********

1. npm init

2. nmp i (with current package.json)

or:

npm i gulp gulp-pug gulp-sass gulp-concat gulp-autoprefixer gulp-clean-css gulp-uglify gulp-rename --save-dev

**********/


// Set gulp and pligins

	var gulp = require('gulp'),
			sass = require('gulp-sass'),
			pug = require('gulp-pug'), // Pug/Jade.
			concat = require('gulp-concat'),
			cleanCSS = require('gulp-clean-css'),
			autoprefixer = require('gulp-autoprefixer'),
			uglify = require('gulp-uglify'),
			rename = require("gulp-rename");


// Set gulp and plugins


///// Pages /////

	// Compile pages
	gulp.task('pagesRoot', function(){
		gulp.src(['../pages/*.pug'])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('../../'))
	});

	gulp.task('pagesArticles', function(){
	 gulp.src(['../pages/articles/*.pug', '!../pages/*.pug'])
	  .pipe(pug({
			pretty: true
		}))
	  .pipe(gulp.dest('../../articles/'))
	});

///// Pages end /////


///// Styles /////

	// Compile styles
	gulp.task('compileStyles', function () {
		return gulp.src('../styles/main.sass')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(rename('styles.min.css'))
	    .pipe(gulp.dest('../../assets/'));
	});

	// Compress styles
	gulp.task('сompressStyles', ['compileStyles'], function() {
	  	return gulp.src('../../assets/*.css')
	    .pipe(cleanCSS({compatibility: 'ie8', processImport: false}))
	    .pipe(gulp.dest('../../assets/'));
	});

	// Set prefixes

	gulp.task('prefixStyles', ['сompressStyles'], function(){
    gulp.src('../../assets/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../../assets/'))
	}
	);

///// Styles end /////


///// Scripts /////

	// Concatenate
	gulp.task('concatScripts', function() {
		return gulp.src([
			'../scripts/vendor/*.js',
			'../scripts/main.js'
			])
		.pipe(concat('concatenate.js'))
		.pipe(gulp.dest('../scripts'));
	});

	// Compress
	gulp.task('compressScripts', ['concatScripts'], function() {
		return gulp.src('../scripts/concatenate.js')
		.pipe(rename('scripts.min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('../../assets/'));
	});

///// Scripts end /////


///// Watching for changes /////

gulp.task('watch', function() {
	gulp.watch('../pages/**/*.pug', ['pagesRoot', 'pagesArticles']);
	gulp.watch('../styles/**/*.{sass, scss, css}', [
		'compileStyles',
		'сompressStyles',
		'prefixStyles'
	]);
	gulp.watch('../scripts/**/*.js', ['concatScripts', 'compressScripts']);
});

///// Watching for changes end /////