const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );

// gulp.task( 'compile', async function () {
//     gulp.src( ['./es/**/*.js'], { base: './es' } )
//         .pipe( babel( {
//             presets: ['es2015', 'stage-0']
//         } ) )
//         .pipe( gulp.dest( 'dist' ) );
// } );

gulp.task( 'compile', () =>
    gulp.src( ['./es/**/*.js'] )
        .pipe( babel( {
            presets: ['@babel/env'],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ['@babel/plugin-proposal-class-properties', {
                    'loose': true
                }],
                ['@babel/plugin-transform-runtime', {
                    'proposal': true,
                    'corejs': 3,
                    'helpers': true,
                    'regenerator': true,
                    'useESModules': true
                }]
            ]
        } ) )
        .pipe( gulp.dest( 'dist' ) )
);