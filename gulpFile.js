var gulp = require("gulp"),//http://gulpjs.com/
	util = require("gulp-util"),//https://github.com/gulpjs/gulp-util
	sass = require("gulp-sass"),//https://www.npmjs.org/package/gulp-sass
	autoprefixer = require('gulp-autoprefixer'),//https://www.npmjs.org/package/gulp-autoprefixer
	cleancss = require('gulp-clean-css'),//https://www.npmjs.org/package/gulp-minify-css
	rename = require('gulp-rename'),//https://www.npmjs.org/package/gulp-rename
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
	log = util.log;

var sassFiles = "asset/sass/**/*.scss";

// Images
gulp.task('images', function() {
    return gulp.src('asset/img/**/**.*')
           .pipe(imagemin({
                progressive: true,
                use: [pngquant()]
           }))
           .pipe(gulp.dest('asset/img/'));
});

// CSS
gulp.task("css", function(){
	log("Generate CSS files " + (new Date()).toString());
    gulp.src(sassFiles)
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest("asset/css"))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest('asset/css'));
});

// Watch SASS
gulp.task("watch", function(){
    log("Watching scss files for modifications");
    gulp.watch(sassFiles, ["sass"]);
});

// Default
gulp.task("default", ["css"]);
