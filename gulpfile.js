const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );

gulp.task( 'compile', async function () {
    gulp.src( ['./es/**/*.js'], { base: './dist' } )
        .pipe( babel( {
            // presets: ['es2015', 'react', 'stage-2']
        } ) )
        .pipe( gulp.dest( 'dist' ) );
} );