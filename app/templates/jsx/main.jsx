/** @jsx m */
'use strict';<% if (moduleLoader === 'browserify') { %>

var $ = require('jquery');
window.jQuery = $;<% if (includeLodash) { %>
var lodash = require('lodash');
window._ = lodash;<% } %>
require('bootstrap');
var m = require('mithril');

//routing configuration
m.route(document.getElementById('ui-router'), '/', {
    //require app module
    '/': require('./components/app.jsx');
});

<% } else { %>
require([
    'jquery',
    'mithril',<% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($, m) {
    $(document).ready(function() {
        /* App Module */

    });
});<% } %>
