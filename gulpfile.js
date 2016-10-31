var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	refresh = require('gulp-refresh');

gulp.task('default', ['sass', 'sass:watch']);

gulp.task('sass', function () {
	return gulp.src('./assets/css/sass/main.sass')
		.pipe(sass( {outputStyle : 'compressed'} ).on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./assets/css'))
		.pipe(refresh())
});

gulp.task('sass:watch', function () {
	refresh.listen()
	gulp.watch('./assets/css/sass/main.sass', ['sass'])
});