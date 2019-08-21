'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify'); 
//var source = require('vinyl-source-stream');
 

/*
gulp.task('js',function(){

	var readableStream = browserify('./app/js/main.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./app/js/'));
	return readableStream;

});
*/
/*

/*
gulp.task('sass',function(){



})
*/

gulp.task('reload',function(){

	browserSync.reload();

});


gulp.task('watch',function(){

	browserSync.init({
		server: {
		  baseDir: 'app',
		},
	});


	gulp.watch(['app/*.html','app/*.htm','app/sibaguide/css/*.css','app/sibaguide/js/*.js','app/sibaguide/main.css','app/sibaguide/guia/*'],['reload']);
	//gulp.watch('app/js/main.js',['js']);
	//gulp.watch('app/sass/**/*.scss',['styles']);
	//gulp.watch('app/js/bundle.js',['reload']);

});

gulp.task('default',['watch']);