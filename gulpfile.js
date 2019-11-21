const gulp = require( 'gulp' );
const ts = require( 'gulp-typescript' );
const tsProject = ts.createProject( 'tsconfig.json', {
    typescript: require( 'typescript' ),
} );
const typescript = tsProject();
async function build () {
    gulp.src( ['./lib/**/*.ts'], { base: './lib' } )
        .pipe(typescript)
        .pipe( await gulp.dest( 'dist' ) );
}

gulp.task( 'build', build );

gulp.task( 'watch', async function () {
    gulp.watch( ['./lib/**/*.ts'], build );
} );