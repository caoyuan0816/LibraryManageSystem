//load gulp 
var gulp = require('gulp');

//load componet 
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

//check script
gulp.task('lint', function() {
	gulp.src('./src/ourjs/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('sass', function() {
	gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'));
});

//combine and compress file
gulp.task('compress', function(){
	gulp.src('./src/ourjs/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
	gulp.src('./dist/css/*.css')
		.pipe(rename('index.min.css'))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));
});
//default task
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'compress');

    // monitor change
    gulp.watch('./src/js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});