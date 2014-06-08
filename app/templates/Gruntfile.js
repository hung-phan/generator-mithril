'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // include browserify alias to config file
    var browserifyAliasConfig = require('./browserify.config.js');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            //js: {
                //files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
                //tasks: ['jshint']
            //},
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer', 'concat']
            },<% if (moduleLoader === 'browserify') { %>
            browserify: {
                files: ['<%%= yeoman.app %>/jsx/{,*/}*.jsx'],
                tasks: ['browserify'],
                options: { livereload: true }
            },<% } else { %>
            react: {
                files: ['<%%= yeoman.app %>/jsx/{,*/}*.jsx'],
                tasks: ['react'],
                options: { livereload: true }
            },<% } %>
            //scripts: {
                //files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                //tasks: ['sass:server', 'autoprefixer', 'concat']
            //},
            styles: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            afterBuild: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.dist %>/scripts/*.js',
                        '!<%%= yeoman.dist %>/scripts/main.js'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (moduleLoader === 'requirejs') { %>

        // Require js config
        bower: { target: { rjsConfig: '<%%= yeoman.app %>/scripts/config.js' } },

        // require js
        requirejs: {
            dist: {
                options: {
                    dir: "<%%= yeoman.dist %>/scripts/",
                    baseUrl: '<%%= yeoman.app %>/scripts', // Directory to look for the require configuration file
                    mainConfigFile: '<%%= yeoman.app %>/scripts/config.js', // This is relative to the grunt file
                    modules: [{ name: 'main' }],
                    preserveLicenseComments: false, // remove all comments
                    removeCombined: true, // remove files which aren't in bundles
                    optimize: 'none', // minify bundles with uglify 2
                    useStrict: true
                }
            }
        },<% } else { %>

        //browserify task
        browserify: {
          app: {
            files: { '<%%= yeoman.app %>/scripts/main.js': ['<%%= yeoman.app %>/jsx/main.jsx'] },
            options: {
              alias: browserifyAliasConfig,
              transform: [require('grunt-react').browserify]
            }
          }
        },<% } %>

        //react compilation task
        react: {
          app: {
            files: [{
                expand: true,
                cwd: '<%%=  yeoman.app %>/jsx/',
                src: ['**/*.jsx'],
                dest: '<%%=  yeoman.app %>/scripts/',
                ext: '.js'
              }]
          }
        },<% if (testFramework === 'jasmine') { %>

        // Jasmine testing framework configuration options
        jasmine: {
            pivotal: {
                src: '<%%= yeoman.app %>/js/**/*.js',
                options: {
                    specs: 'test/spec/*Spec.js',
                    helpers: 'test/spec/*Helper.js'
                }
            }
        },<% } else { %>

        // Mocha tesing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } %>

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.',
                    app: {
                        html: '<%%= yeoman.app %>/index.html',
                        ignorePath: '<%= yeoman.app %>/'
                    },
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': { app: { html: '<%%= yeoman.app %>/index.html', ignorePath: '<%%= yeoman.app %>/' } },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: { dest: '<%%= yeoman.dist %>' },
            html: '<%%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: { assetsDirs: ['<%%= yeoman.dist %>'] },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= yeoman.dist %>/images'
                }],
                options: { cache: false }

            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/styles/style.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },<% if (moduleLoader === 'browserify') { %>
        uglify: {
            dist: {
                files: [{
                    src: '<%%= yeoman.app %>/scripts/*.js', // source files mask
                    dest: '<%%= yeoman.dist %>/scripts/', // destination folder
                    expand: true, // allow dynamic building
                    flatten: true // remove all unnecessary nesting
                }]
            }
        },<% } else { %>
        uglify: {
            dist: {
                files: [{
                    src: [
                        '<%%= yeoman.dist %>/scripts/**/*.js',
                        '!<%%= yeoman.dist %>/scripts/vendor/modernizr.js'
                    ], // source files mask
                    expand: true // allow dynamic building
                }]
            }
        },<% } %>
        concat: {
            dist: {
                src: ['.tmp/styles/{,*/}*.css'],
                dest: '.tmp/styles/style.css'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*',
                        'bower_components/font-awesome/fonts/*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },


        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '!<%%= yeoman.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',<% if (moduleLoader === 'browserify') { %>
            'browserify',<% } else { %>
            'react',<% } %>
            'concat',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test',<% if (testFramework === 'mocha') { %>
            'mocha'<% } else if (testFramework === 'jasmine') { %>
            'jasmine'<% } %>
        ]);
    });<% if (moduleLoader === 'requirejs') { %>

    //bower task for bundle dependencies for requirejs
    grunt.registerTask('bundle-js', ['bower']);

    //requirejs bundle task for build project from src app
    grunt.registerTask('requirejs-bundle', function() {
        //replace bower_components path in app/scripts/main.js file to vendor
        function replaceBetween(string, start, end, what) {
            return string.substring(0, start) + what + string.substring(end);
        };
        var indexHTML = grunt.file.read('dist/index.html');
        indexHTML = replaceBetween(indexHTML,
            indexHTML.indexOf('<!--build script-->'),
            indexHTML.indexOf('<!--end build script-->'), '');
        grunt.file.write('dist/index.html', indexHTML);

    });<% } %>

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'cssmin',<% if (moduleLoader === 'browserify') { %>
        'browserify',<% } else { %>
        'react',
        'requirejs',
        'clean:afterBuild',<% } %>
        'copy:dist',<% if (moduleLoader === 'requirejs') { %>
        'requirejs-bundle',<% } %><% if (includeModernizr) { %>
        'modernizr',<% } %>
        'uglify',
        // 'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
