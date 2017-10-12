const gulp = require('gulp'),
      babel = require('gulp-babel'),
      browserify = require('browserify'),
      watchify = require('watchify'),
      babelify = require('babelify'),
      merge = require('merge-stream'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      rimraf = require('rimraf'),
      remapify = require('remapify'),
      sourcemaps = require('gulp-sourcemaps'),
      livereload = require('gulp-livereload'),
      nodemon = require('gulp-nodemon');

const srcDir = './src';
const outputDir = './.build';

gulp.task('clean', function(cb) {
  rimraf(outputDir, cb);
})

function buildClient(watch) {
  let bundler = browserify(srcDir + '/public/js/main.js', {
      cache: {},
      packageCache: {}
    })
    .plugin(remapify, {
      src: srcDir + '/public/js/**/*.js',
      expose: 'js',
      cwd: srcDir + '/public/js'
    })
    .transform(babelify, { presets: ['env'] });

  if (watch) {
    bundler.plugin(watchify);
  }

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(outputDir + '/public/js'))
      .pipe(livereload());
  }

  if (watch) {
    bundler.on('update', rebundle);
  }

  return rebundle();
}

function watch() {
  return build(true);
}

gulp.task('build-client', function (cb) { return buildClient(false) });

gulp.task('build-server', function (cb) {
  return merge(
    gulp.src(srcDir + '/server/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['env'] }))
      .on('error', (err) => console.error(err.stack || err))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(outputDir + '/server')),
    gulp.src(srcDir + '/server/**/*.ejs')
      .pipe(gulp.dest(outputDir + '/server'))
  );
});

gulp.task('style', function (cb) {
  return gulp.src(srcDir + '/public/**/*.css')
    .pipe(gulp.dest(outputDir + '/public'));
});


gulp.task('style-watch', ['style'], function () {
  gulp.watch(
    [srcDir + '/public/css/**/*'], ['style']
  );
});

gulp.task('images', function() {
  return gulp.src(srcDir + '/public/images/**/*')
    .pipe(gulp.dest(outputDir + '/public/images'));
});


gulp.task('nodemon', function () {
  livereload.listen();

  return nodemon({
    script: outputDir + '/server/index.js',
    env: {
      'NODE_PATH': './node_modules/:./.build/'
    },
    ext: '*',
    ignore: [outputDir],
    tasks: ['build-server', 'build-client']
  });
});

gulp.task('start', ['nodemon', 'style-watch']);
gulp.task('build', ['build-server', 'build-client', 'style', 'images']);
