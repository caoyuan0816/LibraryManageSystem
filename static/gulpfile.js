//load gulp 
var gulp = require('gulp');

//load componet 
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');

//check script
gulp.task('lint', function() {
	gulp.src('./src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// compile sass and add prefixer
gulp.task('sass', function() {
	gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
		.pipe(gulp.dest('./src/css'));
});

//combine and compress file
gulp.task('compress', function(){
	gulp.src('./src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
	gulp.src('./src/css/*.css')
		.pipe(concatCss('main.css'))
		.pipe(gulp.dest('./dist/css'));
	gulp.src('./dist/css/main.css')
		.pipe(rename('main.min.css'))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));
});
//watch files for changes
gulp.task('watch', function(){
	gulp.watch('./src/js/*.js',['lint','compress']);
	gulp.watch('./src/scss/*.scss',['sass','compress']);
});

//default task
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'compress', 'watch');
});