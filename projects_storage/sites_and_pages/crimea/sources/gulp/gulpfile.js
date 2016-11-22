/**********

Install plugins:

// package.json

{
  "name": "...",
  "version": "0.1.0",
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean-css": "^2.0.7",
    "gulp-concat": "^2.6.0",
    "gulp-uglify": "^1.5.3",
  }
}


npm i --save-dev gulp gulp-autoprefixer gulp-clean-css gulp-concat gulp-uglify

**********/

// Set gulp and pligins

var gulp = require("gulp"),
	concat = require("gulp-concat"),
	cleanCSS = require("gulp-clean-css"),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify');


/***** Basic block *****/


// Concat css

gulp.task("concatBasicFunc", function() {
	return gulp.src(["../../styles/sources/reset_and_default.css", "../../styles/sources/basic/**/*.css"])
	.pipe(concat("basic.css"))
	.pipe(gulp.dest("../../styles/compressed"));
});

gulp.task("concatResponsiveFunc", function() {
	return gulp.src(["../../styles/sources/responsive/**/*.css"])
	.pipe(concat("responsive.css"))
	.pipe(gulp.dest("../../styles/compressed"));
});


// Minify css

gulp.task("minifyStylesFunc", ["concatBasicFunc"], function() {
  	return gulp.src("../../styles/compressed/*.css")
    .pipe(cleanCSS({compatibility: "ie8", processImport: false}))
    .pipe(gulp.dest("../../styles/compressed"));
});

// Autoprefixer

gulp.task("prefixStylesFunc", ["concatBasicFunc", "concatResponsiveFunc", "minifyStylesFunc"], function(){
	return gulp.src(".../../styles/compressed/*.css")
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('../../styles/compressed'));
});

// Concat JavaScript

gulp.task("concatJSFunc", function() {
	return gulp.src(["../../scripts/sources/*.js"])
	.pipe(concat("compressed.js"))
	.pipe(gulp.dest("../../scripts/compressed"));
});

// Minify JavaScript

gulp.task("compressJSFunc", ["concatJSFunc"], function() {
	return gulp.src("../../scripts/compressed/compressed.js")
    .pipe(uglify())
    .pipe(gulp.dest("../../scripts/compressed"));
});


/* Watching for changes */

gulp.task("watch", function() {
	gulp.watch("../../styles/sources/**/*.css", ["concatBasicFunc", "concatResponsiveFunc", "minifyStylesFunc", "prefixStylesFunc"]);
	gulp.watch("../../scripts/sources/*.js", ["concatJSFunc", "compressJSFunc"]);
});