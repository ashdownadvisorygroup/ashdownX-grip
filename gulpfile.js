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
var gulpFilter = require('gulp-filter')
    watch = require('gulp-watch')
    rename = require('gulp-rename')
var cleanCSS = require('gulp-clean-css');
// Paths
var bower = require('gulp-bower-files')
var src = {
    styl: ['public/javascripts/angular-jk-carousel/jk-carousel.css'],
    css: ['public/css/**/*.css'],
    js1: ['public/javascripts/angular-jk-carousel/**/*.js'],
    js2: ['public/app/**/*.js'],
    js3: ['public/app/controller/**/*.js'],
    js4: ['public/app/config/**/*.js'],
    js5: ['public/app.js'],
    bower: ['bower.json', '.bowerrc']
}


src.js2 = src.js2.concat(src.js3)
src.js2 = src.js2.concat(src.js4)
src.js2 = src.js2.concat(src.js5)//combinaison des contrôlleurs,services,config et app.js


var publishdir = 'public'

var dist = {
    all: [publishdir + '/**/*'],
    css: publishdir + '/static/',
    js: publishdir + '/static/',
    vendor: publishdir + '/static/'
}
// default task
gulp.task('default', function() {
    gulp.start('task1','bower','javascript' ,'axgrip_css');
});
// css task
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('app/styles/'))
        .pipe(size())

});

// javascript task
gulp.task('scripts', function() {
    return gulp.src([bower + '/jquery/dist/jquery.js', bower + '/bootstrap-sass/assets/javascripts/bootstrap.js','app/scripts/lib/*.js'])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/scripts/'))
        .pipe(size())

});
//tâche de tous les fichiers javascripts qui  sont  dans app:controlleurs ,services....
gulp.task('task1', function() {
    return gulp.src(src.js2)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js));
});
//tâche de tous les fichiers javascripts et css dans le dossier vendor
gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js')
    var cssFilter = gulpFilter('**/*.css')
    return bower()
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(gulp.dest(dist.vendor))
        .pipe(rename('vendor.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.css));
});
//tâche de tous les fichiers javascripts qui ne sont pas dans app,et vendor
gulp.task('javascript', function() {
    return gulp.src(src.js1)
        .pipe(concat('javascripts.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(rename('javascripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js));
});
//tâche de tous les fichiers css qui ne sont pas dans vendor et nos styles écrits
gulp.task('stylesheets', function() {
    return gulp.src(src.styl)
        .pipe(cleanCSS({debug: true}, function(details) {
            //console.log(details.name + ': ' + details.stats.originalSize);
            //console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(dist.css));
});
//tâche de tous les fichiers css que nous avons écrit
gulp.task('axgrip', function() {
    return gulp.src(src.css)
        .pipe(cleanCSS({debug: true}, function(details) {
        }))
        .pipe(gulp.dest(dist.css));
})
