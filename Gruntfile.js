
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  
	    notify: {
	        less:{
	            options:{
	                title: "CSS Files built",
	                message: "Compiled"
	            }
	        }
	    },


	 	notify_hooks: {
	    	options: {
			    enabled: true,
			    max_jshint_notifications: 5, // maximum number of notifications from jshint output 
			    title: "Grunt", // defaults to the name in package.json, or will use project directory's name 
			    success: false, // whether successful grunt executions should be notified automatically 
			    duration: 3 // the duration of notification in seconds, for `notify-send only 
			}
	 	},


	    concat: {
		    css: {
		      src: ['css/main.css', 'css/contact.css'],
		      dest: 'build/css/styles.css',
		    },
	    },
	 

	    autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 8', 'ie 9']
            },
            dist: {
                files: {
                    'build/css/styles.css': 'build/css/styles.css'
                }
            }
        },


	    watch: {
			css: {
			  files: ['css/*.css'],
			  tasks: ['concat'],
			},

			less: {
			  files: ['less/*.less'],
			  tasks: ['less', 'autoprefixer', 'notify:less'],
			},
	   },
	 

	    less: {
		  development: {
		    options: {
		      paths: ['less/']
		    },
		    files: {
		      'css/main.css': 'less/main.less'
		    }
		  },
		},


		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'C:/wamp64/www/**/*.css', 
                        'C:/wamp64/www/*.html', 
                    ]
                },
                options: {
                    /*watchTask: true,*/
                    /*server: './'*/
                    proxy: 'localhost:8080'
                }
            }
        },

	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', ['concat', 'less', 'autoprefixer', 'watch', 'notify', 'browserSync']);
};