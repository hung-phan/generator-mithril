'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponentGenerator = yeoman.generators.NamedBase.extend({
  init: function() {
    console.log('You called the component subgenerator with the argument ' + this.name + '.');
  },
  moduleLoader: function() {
    var cb = this.async();

    var prompts = [{
      type: 'list',
      name: 'moduleLoader',
      message: 'What module loader would you like to include?',
      choices: [{
        name: 'Browserify',
        value: 'browserify'
      }, {
        name: 'Requirejs',
        value: 'requirejs'
      }]
    }];

    this.prompt(prompts, function(props) {
      this.moduleLoader = props.moduleLoader;
      cb();
    }.bind(this));
  },
  files: function() {
    var relativePath = 'app/jsx/' + this.name + '/';
    this.template('component.jsx', relativePath + this.name + '.jsx');
    this.template('_component.tpl.jsx', relativePath + '_' + this.name + '.tpl.jsx');
  }
});

module.exports = ComponentGenerator;
