var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var del = require("del");

gulp.task('default', ['homeCss','homeJs','watch']);

gulp.task('watch', function() {'homeJs',

	gulp.watch('./assets/css/scss/**/*.scss', ['homeCss']);
            
	gulp.watch('./assets/js/modules/**/*.js', ['homeJs']);
});

gulp.task('homeCss', ['homeSassCss'], function(){
	var o = [
			'./assets/js/vendor/bootstrap-4.4.1/bootstrap.min.css',
			'./assets/js/vendor/slick/slick.css',
			'./assets/js/vendor/jquery-ui-1.12.1/jquery-ui.min.css',
			'./assets/css/home.sass.min.css'
		],
		d = './assets/css',
		n = 'home.min.css';

	return gulp.src(o)
		// .pipe(sourcemaps.init())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(concat(n))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		// .pipe(sourcemaps.write())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(gulp.dest(d))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.on("end", function(){
			del(o[3]);
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"] finalizou " + n);
		});
});

gulp.task('homeSassCss', function(){
	var o = './assets/css/sass/home.min.scss',
		d = './assets/css',
		n = 'home.sass.min.css';

	return gulp.src(o)
		// .pipe(sourcemaps.init())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(concat(n))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(autoprefixer({browsers: ['> 0%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7']}))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		// .pipe(sourcemaps.write())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(gulp.dest(d))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.on("end", function(){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"] finalizou " + n);
		});
});

gulp.task('homeJs', function() {
	var o = [
		'./assets/js/vendor/bootstrap-4.4.1/bootstrap.min.js',
		'./assets/js/vendor/slick/slick.min.js',
		'./assets/js/vendor/jquery-ui-1.12.1/jquery-ui.min.js',
		'./assets/js/vendor/jquery.hoverIntent.min.js',
		'./assets/js/modules/home.js'
	];
	var d = './assets/js';

	return gulp.src(o)
		// .pipe(sourcemaps.init())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(concat('home.min.js'))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(uglify())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		// .pipe(sourcemaps.write())
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.pipe(gulp.dest(d))
		.on('error', function(err){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"][Error] " + err.toString());
		})
		.on('end', function(){
			console.log("["+(new Date()).toTimeString().substring(0, 8)+"] finalizou home.min.js");
		});
});