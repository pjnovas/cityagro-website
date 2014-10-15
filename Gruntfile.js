
module.exports = function(grunt) {
  var pathDev = "";
  var pathProd = "";

  try {
    pathDev = require('./config.dev.json').baseURL;
  }
  catch(e){};

  try {
    pathProd = require('./config.prod.json').baseURL;
  }
  catch(e){};    

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! \n* <%= pkg.title || pkg.name %> - v<%= pkg.version %>' +
            '\n* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> ' +
            '\n* <%= pkg.homepage ? pkg.homepage : "" %> ' +
            '\n*/ \n\n',

    paths: {
      app: {
        public: "public/",
        root: "client/app/",
        less: "client/app/styles/",
        html: "views/",
      },
      vendor: {
        js: "client/vendor/scripts/",
        css: "client/vendor/styles/"
      },
      dist: {
        root: "client/dist/",
        appName: "app.js",
        vendorName: "vendor.js",
        vendorCSSName: "vendor.css",
        exportJS: "public/js/",
        exportCSS: "public/css/"
      }
    },

    clean: {
      before: {
        src: [
          "<%= paths.app.root %>templates/**/*.hbs.js", 
          "<%= paths.dist.root %>*",
          "!<%= paths.dist.root %>.gitignore"
        ],
      },
      after: {
        src: [
          "<%= paths.app.root %>templates/**/*.hbs.js"
        ]
      } 
    },

    handlebars: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'client/app/templates/',
            src: ['**/*.hbs'],
            dest: 'client/app/templates/',
            ext: '.hbs.js',
          },
        ]
      }
    },

    browserify: {
      app: {
        options:{
          extension: [ '.js' ]
        },
        src: ['<%= paths.app.root %>index.js'],
        dest: '<%= paths.dist.root %><%= paths.dist.appName %>'
      }
    },

    concat: {
      styles: {
        src: [
            '<%= paths.vendor.css %>bootstrap.min.css'
          , '<%= paths.vendor.css %>**/*.css'
         ],
        dest: '<%= paths.dist.root %><%= paths.dist.vendorCSSName %>'
      },
      vendor: {
        options: {
          separator: ';',
        },
        src: [
            '<%= paths.vendor.js %>jquery.min.js'
          , '<%= paths.vendor.js %>**/*.js'
         ],
        dest: '<%= paths.dist.root %><%= paths.dist.vendorName %>'
      },
      app: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>',
        },
        files: {
          '<%= paths.dist.root %><%= paths.dist.appName %>': 
            [ '<%= paths.dist.root %><%= paths.dist.appName %>' ]
        }
      }
    },

    uglify: {
      all: {
        options: {
          stripBanners: {
            line: true
          },
          banner: '<%= banner %>',
        },
        files: {
          '<%= paths.dist.root %><%= paths.dist.appName %>':
            '<%= paths.dist.root %><%= paths.dist.appName %>',

          '<%= paths.dist.root %><%= paths.dist.vendorName %>':
            '<%= paths.dist.root %><%= paths.dist.vendorName %>',
        }
      }
    },

    copy: {
      dist: {
        cwd: "./", 
        files: {
          "<%= paths.dist.exportCSS %><%= paths.dist.vendorCSSName %>": 
            "<%= paths.dist.root %><%= paths.dist.vendorCSSName %>",

          "<%= paths.dist.exportJS %><%= paths.dist.vendorName %>": 
            "<%= paths.dist.root %><%= paths.dist.vendorName %>",

          "<%= paths.dist.exportJS %><%= paths.dist.appName %>": 
            "<%= paths.dist.root %><%= paths.dist.appName %>"
        }
      }

    },

    watch: {
      options: {
        livereload: 35729
      },
      local: {
        files: [
          "<%= paths.app.root %>**/*",
          "<%= paths.app.public %>css/*.less",
          "<%= paths.app.html %>**/*",
          "!<%= paths.app.root %>templates/**/*.hbs.js"
        ],
        tasks: ['default'],
      },
      test: {
        files: ["router/api/**/*", "tests/api/**/*",
          "!<%= paths.app.root %>**/*"],
        tasks: ['test']
      }
    },

    jshint: {
      all: {
        files: {
          src: ["<%= paths.app.root %>**/*.js"]
        },
        options: {
          bitwise: true
          ,curly: true
          ,eqeqeq: true
          ,forin: true
          ,immed: true
          ,latedef: true
          ,newcap: true
          ,noempty: true
          ,nonew: true
          ,quotmark: false
          ,undef: true
          ,unused: true
          ,laxcomma: true

          ,globals: {
            window: true
            ,jQuery: true
            ,$: true
            ,_: true
            ,require: true
            ,module: true
            ,Backbone: true
            ,Handlebars: true
            ,console: true
            ,moment: true
            ,Printer: true
            ,literalNumbers: true
            ,cityagro: true
          }
        }
      }
    },


    // -------------------------
    // Server API Test Runners
    // -------------------------
    
    express: {
      test: {
        options: {
          script: './bin/www',
          node_env: 'test',
          port: require('./config.test').port
        }
      }
    },

    mochacov: {
      options: {
        files: 'tests/**/*.js',
        ui: 'bdd',
        colors: true
      },
      unit: {
        options: {
          reporter: 'spec'
        }
      },
    }

    // -----------------------
    // -----------------------

  });

  // Server API Test Runner TASKS

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.registerTask("test", ['express:test', 'mochacov:unit']);
  grunt.registerTask("wtest", ["test", "watch:test"]);


  // Client TASKS

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-commonjs-handlebars');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var preBuild = [
    "clean:before", 
    "jshint:all", 
    "handlebars", 
    "browserify", 
    "concat"
  ];

  var postBuild = [
    "clean:after",
    "copy"
  ];

  grunt.registerTask("default", preBuild.concat(postBuild));
  grunt.registerTask("prod", preBuild.concat(["uglify"], postBuild));
  grunt.registerTask("w", ["default", "watch:local"]);

};
