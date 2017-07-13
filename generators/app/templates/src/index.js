const global = window;
const defined = global.requirejs && global.requirejs.defined;
const define = (global && global.define) || define;

let dependencies = [
  'qvangular',
  'js/qlik',
  'underscore',
  'jquery'
]
.map(function(path){
  if(defined(path))
    return path
  else return null;
});

define(dependencies,
  function (qvangular,qlik,_,$) {
    const initialProperties = require('./initialProperties');
    const properties = require('./properties')({qvangular,qlik,_,$});
    const paint = require('./paint')({qvangular,qlik,_,$});
    const controller = require('./controller')({qvangular,qlik,_,$});
    const template = require('html-loader!./lib/partials/ng-<%=extensionNameSafe.toLowerCase() %>.html');

    return {
       initialProperties: initialProperties,
       definition: properties,
       paint: paint,
       controller: controller,
       template:template,
        support: {
          snapshot: true,
          export: true,
          exportData: true
        }
    }
});
