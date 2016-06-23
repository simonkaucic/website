// Requirements
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');

// Bootstrap with Less Task
gulp.task('less', function() {
    return gulp.src('app/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

// Images Task
gulp.task('images', function() {
	return gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Scripts Task
gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('dist'));
});

//Fonts
gulp.task('fa-fonts', function() {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('fonts'));
});
gulp.task('fa-lib', function() {
	return gulp.src('node_modules/font-awesome/css/font-awesome.css')
		.pipe(gulp.dest('dist'));
});

// Icons Task
gulp.task('glyphicons', function() {
	return gulp.src('node_modules/bootstrap-less/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

// Bootstrap Task
gulp.task('bootstrap', function() {
	return gulp.src('node_modules/bootstrap-less/js/bootstrap.min.js')
        .pipe(concat('bootstrap.min.js'))
		.pipe(gulp.dest('dist'));
});

// jQuery Task
gulp.task('jquery', function() {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(concat('jquery.min.js'))
		.pipe(gulp.dest('dist'));
});

// Clean Task
gulp.task('clean', function(cb) {
	return del(['dist/*'], cb);
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch('app/less/*.less', gulp.series('less'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
    gulp.watch('app/img/*', gulp.series('images'));
});

// Default Task
gulp.task('default', gulp.series('clean', 'fa-fonts' , 'fa-lib', 'glyphicons', 'jquery', 'bootstrap', 'less', 'scripts', 'images', 'watch'));