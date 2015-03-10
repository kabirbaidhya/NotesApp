var assets = {
    vendor: {
        styles: [
            './bower_components/bootstrap/dist/css/bootstrap.css',
        ],
        scripts: [
            './bower_components/angular/angular.min.js',
            './bower_components/angular/angular-route.min.js',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
        ]
    },
    app: {
        styles: [
            './assets/**/*.css'

        ],
        scripts: [
            './app/**/*.js'
        ]
    }
};


(function() {
    var gulp = require('gulp');

    var plugins = require('gulp-load-plugins')({
        lazy: false
    });

    gulp.task('scripts', function() {
        //combine all js files of the app
        gulp.src(assets.app.scripts)
            .pipe(plugins.concat('all.app.js'))
            .pipe(gulp.dest('./build/js'));
    });

    gulp.task('css', function() {
        gulp.src(assets.app.styles)
            .pipe(plugins.concat('all.app.css'))
            .pipe(gulp.dest('./build/css'));
    });

    gulp.task('vendorJS', function() {
        //concatenate vendor JS files
        gulp.src(assets.vendor.scripts)
            .pipe(plugins.concat('all.packages.js'))
            .pipe(gulp.dest('./build/js'));
    });

    gulp.task('vendorCSS', function() {
        //concatenate vendor CSS files
        gulp.src(assets.vendor.styles)
            .pipe(plugins.concat('all.packages.css'))
            .pipe(gulp.dest('./build/css'));
    });

    gulp.task('copy-fonts', function() {
        gulp.src('./bower_components/bootstrap/dist/fonts/*')
            .pipe(gulp.dest('./build/fonts'));
    });

    gulp.task('copy-index', function() {
        gulp.src('./app/index.html')
            .pipe(gulp.dest('./build'));
    });


    gulp.task('watch', function() {
        gulp.watch([
            'build/**/*.html',
            'build/**/*.js',
            'build/**/*.css'
        ], function(event) {
            return gulp.src(event.path)
                .pipe(plugins.connect.reload());
        });

        gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
        gulp.watch('./app/**/*.css', ['css']);
        gulp.watch('./app/index.html', ['copy-index']);

    });

    gulp.task('connect', plugins.connect.server({
        root: ['build'],
        port: 1234,
        livereload: true
    }));

    gulp.task('default', [
        'connect', 'scripts', 'vendorJS', 'vendorCSS', 'css', 'copy-fonts', 'copy-index', 'watch'
    ]);

})();
