var yargs  = require('yargs'),
    join   = require('path').join,
    gulp   = require('gulp'),
    fs     = require('fs'),
    del    = require('del'),
    config = {
        paths: {
            scripts: ['src/**/*.js', 'src/*.js', 'src/*.jsx', 'src/**/*.jsx'],
            tests: ['test/*.spec.js'],
            dest: 'dist'
        }
    },
    args   = yargs
        .default('only', undefined)
        .default('with-debug', false)
        .argv;

gulp.task('lint', function() {
    var eslint = require('gulp-eslint');
    var eslintrc = JSON.parse(fs.readFileSync('.eslintrc', 'utf8'));
    return gulp.src(config.paths.scripts)
        .pipe(eslint(eslintrc))
        .pipe(eslint.formatEach('stylish'))
});

gulp.task('compile', function() {
    var babel = require('gulp-babel');
    return gulp.src(config.paths.scripts)
        .pipe(babel({
            optional: [
                'es7.decorators',
                'es7.asyncFunctions'
            ]
        }))
        .pipe(gulp.dest(config.paths.dest));
});

gulp.task('test', ['compile'], function() {
    if (args.withDebug) {
        process.env.DEBUG = 'grumpf:*';
    }
    var mocha = require('gulp-mocha');
    return gulp.src(config.paths.tests, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            ui: 'tdd',
            grep: args.only,
            require: [join(__dirname, 'test/babelRegister')]
        }));
});

gulp.task('watch', ['build'], function() {
    gulp.watch(config.paths.scripts, ['lint', 'test']);;
    gulp.watch(config.paths.tests, ['lint', 'test']);;
});

gulp.task('clean', function() {
    return del('dist/**/*');
});

gulp.task('build', ['lint', 'test']);
