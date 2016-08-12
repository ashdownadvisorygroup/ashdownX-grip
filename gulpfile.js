/**
 * Created by NOUBISSI TAPAH PHOEB on 27/07/2016.
 */
// fichier gulpfile.js

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    size = require('gulp-filesize');

// Paths
var bower = './app/bower_components';

// css task
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('app/styles/'))
        .pipe(size())
        .on('end', function(){
            gutil.log(gutil.colors.yellow('♠ La tâche CSS est terminée.'));
        });
});

// javascript task
gulp.task('scripts', function() {
    return gulp.src([bower + '/jquery/dist/jquery.js', bower + '/bootstrap-sass/assets/javascripts/bootstrap.js','app/scripts/lib/*.js'])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/scripts/'))
        .pipe(size())
        .on('end', function(){
            gutil.log(gutil.colors.yellow('♠ La tâche JavaScript est terminée.'));
        });
});

// default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});