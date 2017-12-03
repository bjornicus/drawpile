module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    templates: {
      joinTo: 'app.js'
    }
  },
  plugins: {
    // vue: {
    //   extractCSS: true,
    //   out: '../public/styles/components.css'
    // },
    swPrecache: {
      autorequire: ['public/index.html'],
      options: {
        // staticFileGlobs: ['public/**/!(*map*)'],
        stripPrefix: 'public/'
      }
    },
    babel: {
      plugins: ["transform-object-rest-spread"],
      presets: [['env', {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7']
        }
      }]]
    }
  }
}
module.exports.plugins.vue = module.exports.plugins.vue || {};
module.exports.plugins.vue.babel = module.exports.plugins.babel || {};