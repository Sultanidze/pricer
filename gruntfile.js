module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['sass/style.scss','sass/modules/*.scss','sass/partials/*.scss','sass/vendor/*.scss'],
				tasks: ['sass:dist']
			},
			//livereload: {
			//	files: ['*.html', '*.php', 'js/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
			//	options: {
			//		livereload: true
			//	}
			//}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		}
	});
	grunt.registerTask('default', ['sass:dist', 'watch']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
