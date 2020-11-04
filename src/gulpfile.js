const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const pug = require('gulp-pug');


gulp.task('pug', function () {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest("public"));
});


gulp.task('rebuild', gulp.parallel('pug'), function () {
    browserSync.reload();
});




gulp.task('server', function () {

    browserSync.init({
        server: {
            baseDir: "public",
            online: true,
            tunnel: true,
            logLevel: "debug",
            port: 5000
        }
    });

    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src("src/js/**/*.+(js)")
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});



gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch('src/**/*.pug', gulp.parallel('rebuild'));
    gulp.watch('src/**/*.js', gulp.parallel('js'));
})



gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'pug', 'js'));