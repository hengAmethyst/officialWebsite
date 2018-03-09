 	 let gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	     sass = require('gulp-sass'),
       uglify = require('gulp-uglify'),
       rename = require('gulp-rename'),
          del = require('del'),
      connect = require('gulp-connect');
//------------------------压缩--------------------------//
//执行压缩前，先删除以前压缩的文件
gulp.task('clean', function() {
    return del(['./dist/css/*.min.css'])
})
//压缩css
gulp.task('minify_css',["clean"], function () {
    let cssSrc = ['./dist/css/*.css'];
    return 
    		gulp.src(cssSrc)      //压缩的文件
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css')) //执行压缩
})
//压缩js
gulp.task('minify_js',["clean"], function() {
    let jsSrc = ['./src/*.js'];
    return 
    		gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./dist/js'));  //输出
})
//---------------热加载-------------------//
gulp.task('connect', function() {
  connect.server({
//	port:'8888',//设置服务端口,不设置默认为8080
    root: 'src',
    livereload: true
  })
})
//html热刷新
gulp.task('html', function () {
   gulp.src('./src/*.html')
  .pipe(connect.reload());
});
//css热刷新
gulp.task('sass', function () {
	gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});
//js热刷新
gulp.task('js', function () {
	gulp.src('./src/js/*.js')
    .pipe(connect.reload());
});
//html文件增加时候热刷新	
gulp.task('copy_html',function(){
    gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./dist/html'));
});
//js文件增加时候刷新
gulp.task('copy_js',function(){
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'));
});
//监控需要热加载的任务
gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/html/*.html',['copy_html']);
  gulp.watch('./src/js/*.js',['copy_js']);
});
//-------------------gulp default----------------------//
// 默认任务
gulp.task('default', ['connect','watch'])
// you
