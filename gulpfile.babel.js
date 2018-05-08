import gulp from 'gulp';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('nodemon', cb => {
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
  return gulp.src('server/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', () => {
  return gulp.src('server/*.js')
    .pipe(watch('server/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('default',['transform', 'nodemon', 'watch']);
