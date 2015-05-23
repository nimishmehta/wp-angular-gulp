var Q= require('q'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    ngtemplateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    replace = require('gulp-replace');

var siteConfig = require('./site-config.json');

var paths = {
	siteUrl: siteConfig.siteUrl,
	apiUrl: siteConfig.apiUrl,
	index: ['src/index.jade'],
	scripts: ['src/**/*.js'],
	vendorScripts: [
		'bower_components/modernizr/modernizr-custom.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
	  ],
	css: ['src/**/*.css'],
	vendorCss: [
			'bower_components/pure/base.css',
			'bower_components/pure/buttons.css',
			'bower_components/pure/menus.css',
			'bower_components/pure/grids.css',
			'bower_components/pure/grids-responsive.css',
		],
	template: ['src/**/*.jade', '!src/index.jade']
};

gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

gulp.task('scripts', [], function() {
	var deferred = Q.defer();

	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	gulp.src(paths.scripts)
        .pipe(replace(/%%API_URL%%/, paths.apiUrl))
		.pipe(sourcemaps.init())
		  // .pipe(uglify())
		  .pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

gulp.task('vendor-scripts', [], function() {
	var deferred = Q.defer();

	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	gulp.src(paths.vendorScripts)
		.pipe(sourcemaps.init())
		  // .pipe(uglify())
		  .pipe(concat('vendor.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

gulp.task('vendor-css', [], function() {
	var deferred = Q.defer();

	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	gulp.src(paths.vendorCss)
		.pipe(sourcemaps.init())
		  .pipe(concat('vendor.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

gulp.task('css', [], function() {
	var deferred = Q.defer();

	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	gulp.src(paths.css)
		.pipe(sourcemaps.init())
			.pipe(minifyCss())
			.pipe(concat('main.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

gulp.task('template', function() {
	var deferred = Q.defer();

	gulp.src(paths.template)
		.pipe(sourcemaps.init())
			.pipe(jade())
			.pipe(ngtemplateCache('templates.js', { module: 'app'}))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

gulp.task('index', function() {
	var deferred = Q.defer();

	gulp.src(paths.index)
		.pipe(jade())
		.pipe(gulp.dest('dist'))
		.on('finish', deferred.resolve);

	return deferred.promise;
});

// LocalHost testing connect task
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		host: '0.0.0.0'
	});
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.css, ['css']);
	gulp.watch(paths.index, ['index']);
	gulp.watch(paths.template, ['template']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'vendor-scripts', 'scripts', 'vendor-css', 'css', 'template', 'index', 'connect']);