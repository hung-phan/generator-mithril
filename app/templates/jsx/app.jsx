/** @jsx m */<% if (moduleLoader === 'browserify') { %>
'use strict';
//require mithril module
var m = require('mithril');

//namespace for app
var app = {};

//model
app.App = function(text) {
    this.text = m.prop(text);
    this.done = m.prop(false);
};
app.AppList = Array;
//controller
app.controller = function() {
    this.list = new app.AppList();
    this.text = m.prop('');

    this.add = function() {
        if (this.text()) {
            this.list.push(new app.App(this.text()));
            this.text('');
        }
    }.bind(this);
};

//view
app.view = function(ctrl) {
    return (@@include('_app.tpl.jsx'));
};

module.exports = app;<% } else { %>
define(['mithril'], function(m) {
    'use strict';

    //namespace for app
    var app = {};

    //model
    app.App = function(text) {
        this.text = m.prop(text);
        this.done = m.prop(false);
    };
    app.AppList = Array;
    //controller
    app.controller = function() {
        this.list = new app.AppList();
        this.text = m.prop('');

        this.add = function() {
            if (this.text()) {
                this.list.push(new app.App(this.text()));
                this.text('');
            }
        }.bind(this);
    };

    //view
    app.view = function(ctrl) {
        return (@@include('_app.tpl.jsx'));
    };

    return app;
});<% } %>
