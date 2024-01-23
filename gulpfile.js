import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import del from 'del';

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream())
}

//HTML

const html = () =>{
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'))
}

//JS

const scripts = ()=>{
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

//Images
const copyImages = ()=>{
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

const optimizeImages = () =>{
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

//WebP

const createWebp =()=>{
  return gulp.src ('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}

//SVG

const optimizeSVG = () =>{
  return gulp.src(['source/img/**/*.svg','!source/img/icon/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'))
}

//Sprite

const createSprite = ()=>{
  return gulp.src('source/img/icon/*.svg')
  .pipe(svgo({
    plugins: [
      {
        removeViewBox: false,
      },
    ],
  }))
  .pipe(svgstore({
    inlineSvg:true
  }))
  .pipe (rename('sprite.svg'))
  .pipe (gulp.dest('build/img'));
}

//Copy

const copy = (done) => {
  gulp.src([
  'source/fonts/*.{woff2,woff}',
  'source/*.ico',
  'source/*.webmanifest'
  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
  }

//Clean
const clean = () =>{
  return del(['build']);
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  gulp.watch("source/js/*.js", gulp.series(scripts, reload));
  done();
}

//Reload
const reload = (done) => {
  browser.reload();
  done()
};

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('sourse/js/*.js', gulp.series(scripts, reload));
  gulp.watch('source/*.html', gulp.series(html,reload));
}

//Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSVG,
    createSprite,
    createWebp
  )
)

//Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSVG,
    createSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));

