const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify=require('gulp-uglify');
const less=require('gulp-less');
const minifyCss = require("gulp-minify-css");
const minifyHtml = require("gulp-minify-html");
const jshint = require("gulp-jshint");
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const clean = require('gulp-clean');

gulp.task('taskWatch',function(){
    gulp.watch('src/*.html',gulp.series('taskHtml'));
    gulp.watch('src/css/*.less',gulp.series('taskCss'));
    gulp.watch('src/js/*.js',gulp.series('taskJs'));
    gulp.watch('src/images/*',gulp.series('taskImage'));
})

gulp.task('taskConnect',function(){
    connect.server({
        root:'src',
        livereload:true,
        port:9909
    })
})
 
gulp.task('taskHtml',function(){
    return gulp.src('src/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/html'))
    .pipe(connect.reload());
})
 
gulp.task('taskCss',function(){
    return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
 
gulp.task('taskJs',function(){
    return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

gulp.task('taskImage',function(){
    return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
})

gulp.task('taskClean',function(){
    return gulp.src('dist/*')
    .pipe(clean({ read:false }));
})

gulp.task('default',gulp.series('taskClean',gulp.parallel('taskConnect','taskWatch','taskHtml','taskCss','taskJs','taskImage')));
 