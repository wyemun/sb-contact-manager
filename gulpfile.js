'use strict'

var gulp        = require('gulp'),
    path        = require('path'),
    uglify      = require('gulp-uglify'),
    watchify 	  = require('watchify'),
    babelify 	  = require('babelify'),
    browserify  = require('browserify'),
    source 		  = require('vinyl-source-stream'),
    streamify   = require('gulp-streamify'),
    notify      = require('gulp-notify'),
    gulpsync 	  = require('gulp-sync')(gulp),
    rimraf      = require('gulp-rimraf'),
    _           = require('lodash'),
    gulpif      = require('gulp-if'),
    gutil       = require('gulp-util'),
    rename      = require('gulp-rename'),
    less        = require('gulp-less')
    //config      = require('./config.json')

// Configuratioon
const config = {
  distPath : './dist'
}

gulp

/**
 * Cleaning distribution folder
 */
.task('clean', function() {
  return gulp.src(config.distPath)
      .pipe(rimraf())
})

.task('clean:danger', function(cb) {
	return gulp.src(config.distPath)
	    .pipe(rimraf({ force: true }))
})

/* Build JS */
.task('js', function() {
  return buildScript('./app/index.jsx')
})

/* Build CSS */
.task('css', function(){
  return gulp.src('./less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(config.distPath))
  // var opts = {
  //   entry: './less/main.less',
  //   output: config.distPath + '/bundle.css',
  //   assets: {
  //     dest: config.distPath + '/fonts',
  //     prefix: 'fonts/'
  //   },
  //   compress: (process.env.NODE_ENV === 'production')
  // }
  //
  // atomifyCSS(opts)
})

.task('copy', function() {
  return gulp.src([
      'statics/**/*'])
      .pipe(gulp.dest(config.distPath))
})

/* Copy Fonts */
.task('fonts', function() {
    return gulp.src([
      'node_modules/bootstrap/fonts/*'])
    .pipe(gulp.dest(config.distPath + '/fonts/'))
})

.task('set-production', function() {
    process.env.NODE_ENV = 'production'
})

/* Watch Job */
.task('watch', function() {
  gulp.watch(['./less/**/*.less'], ['css'])
  return buildScript('./app/index.jsx', true)
})

.task('build', gulpsync.sync(['clean:danger', ['copy', 'fonts', 'js', 'css']]), function(){
  return
})

.task('build:production', gulpsync.sync(['set-production', 'clean:danger', ['copy', 'fonts', 'js', 'css']]), function(){
  return
})


/**
 * Build Script for JS task
 */
function buildScript(file, watch) {
  var options = {
    entries: [file],
    extensions: ['.jsx', '.js'],
    debug: process.env.NODE_ENV !== 'production'
  }

  var props = _.assign({}, watchify.args, options)
  var bundler = watch ? watchify(browserify(props)) : browserify(props)

  bundler.transform(babelify)

  function rebundle(file) {
    var stream = bundler.bundle()
    return stream.on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe( gulpif(process.env.NODE_ENV === 'production', streamify(uglify()) ) )
  		.pipe(gulp.dest(config.distPath))
  }

  bundler.on('update', function() {
    gutil.log('Rebundle...')
    rebundle()
    notify('Done rebundling!')
    gutil.log('Done rebundling...')
  })

  return rebundle()
}

function handleErrors() {

  var args = Array.prototype.slice.call(arguments)
  console.log('Error Building Script', args)
  notify.onError({
    title: 'We have a problem.',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end')
}
