/** node_modules */
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var replace = require('gulp-string-replace');
var map = require('map-stream');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')();

/** task */
gulp.task('jsLint', function () {
  return gulp
    .src(config.alljs)
    .pipe($.jshint())
    .pipe(reporter);
});

gulp.task('inject', ['templates'], function () {
  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.js), {
      relative: true
    }))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject-dev', function () {
  var devJs = [].concat(config.js);
  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(devJs), {
      relative: true
    }))
    .pipe(gulp.dest(config.client));
});

gulp.task('templates', function () {
  return gulp.src(config.templates)
    .pipe(templateCache({
      root: 'app/',
      filename: 'templates.module.js',
      module: 'app.templates',
      standalone: true
    }))
    .pipe(gulp.dest('client/app/'));
});

gulp.task('copy', function () {
  return gulp
    .src(config.assets, {
      base: config.client
    })
    .pipe(gulp.dest(config.dist + '/'));
});

gulp.task('optimize', ['jsLint', 'inject'], function () {
  var options = {
    // preserveComments: 'license',
    compress: false,
    mangle: false
  };

  return gulp
    .src(config.index)
    .pipe($.plumber({
      errorHandler: swallowError
    }))
    .pipe($.useref())
    .pipe($.if('scripts/app.js', replace(/\/\/\s*'app.templates\'/g, '\'app.templates\'')))
    .pipe($.if('scripts/app.js', $.uglify(options)))
    .pipe(gulp.dest(config.dist));
});

gulp.task('dev', ['inject-dev', 'jsLint'], function () {
  startBrowserSync('dev');
});

gulp.task('build', ['optimize', 'copy'], function () {
  startBrowserSync('build');
});

function startBrowserSync(opt) {
  if (browserSync.active) {
    return;
  }

  var options = {
    port: 8888,
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0, //1000,
    online: false
  };

  switch (opt) {
    case 'dev':
      serveApp();
      break;
    case 'build':
    default:
      serveDistApp();
      break;
  }

  function serveApp() {
    options.server = {
      baseDir: [
        config.client
      ]
    };
    options.files = [
      config.client + '/**/*.*'
    ];

    browserSync(options);
  }

  function serveDistApp() {
    options.server = {
      baseDir: [
        config.dist
      ]
    };
    options.files = [
      config.publish + '/**/*.*',
      '!' + config.publish + '/assets/**/*.*'
    ];

    browserSync(options);
  }
}

function swallowError(error) {
  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

var reporter = map(function (file, cb) {
  if (file.jshint.success) {
    return cb(null, file);
  }

  console.log('For ', file.path);
  file.jshint.results.forEach(function (result) {
    if (!result.error) {
      return;
    }

    const err = result.error;
    if (err.code === 'W040') {
      return;
    }
    if (err.code.charAt(0) === 'E') {
      console.log('\t[ERROR] line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      console.log('Build failed (please check the file->' + file.path + ')');
      process.exit();
    } else {
      console.log('\t[WARN] line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
    }
  });

  cb(null, file);
});