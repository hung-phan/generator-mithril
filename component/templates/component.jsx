/** @jsx m */<% if (moduleLoader === 'browserify') { %>
'use strict';
//require mithril module
var m = require('mithril');

//namespace for <%= name %>
var <%= name %> = {};

//model
<%= name %>.<%= name %> = function(text) {
    this.text = m.prop(text);
    this.done = m.prop(false);
};
<%= name %>.AppList = Array;
//controller
<%= name %>.controller = function() {
    this.list = new <%= name %>.AppList();
    this.text = m.prop('');

    this.add = function() {
        if (this.text()) {
            this.list.push(new <%= name %>.<%= name %>(this.text()));
            this.text('');
        }
    }.bind(this);
};

//view
<%= name %>.view = function(ctrl) {
  return (@@include('_<%= name %>.tpl.jsx'));
};

module.exports = <%= name %>;<% } else { %>
define(['mithril'], function(m) {
    'use strict';

    //namespace for <%= name %>
    var <%= name %> = {};

    //model
    <%= name %>.<%= name %> = function(text) {
        this.text = m.prop(text);
        this.done = m.prop(false);
    };
    <%= name %>.AppList = Array;
    //controller
    <%= name %>.controller = function() {
        this.list = new <%= name %>.AppList();
        this.text = m.prop('');

        this.add = function() {
            if (this.text()) {
                this.list.push(new <%= name %>.<%= name %>(this.text()));
                this.text('');
            }
        }.bind(this);
    };

    //view
    <%= name %>.view = function(ctrl) {
      return (@@include('_<%= name %>.tpl.jsx'));
    };

    return <%= name %>;
});<% } %>
