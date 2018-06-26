import gulp from 'gulp';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('nodemon', ['transform'] ,cb => {
  let started = false;

  return nodemon({
    script: './lib/express.js'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('transform', () => {
  return gulp.src(['server/*.js', 'server/*/*.js', 'config/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', () => {
  return gulp.src(['server/*.js', 'server/*/*.js', 'config/*.js'])
    .pipe(watch(['server/*.js', 'server/*/*.js', 'config/*.js'], {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('default',['transform', 'watch', 'nodemon']);
