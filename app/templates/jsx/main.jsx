/** @jsx m */
'use strict';<% if (moduleLoader === 'browserify') { %>

//require jquery
var $ = require('jquery');
window.jQuery = $;
require('bootstrap');<% if (includeLodash) { %>
//require lodash
var lodash = require('lodash');
window._ = lodash;<% } %>
//require mithril
var m = require('mithril');

$(document).ready(function() {
    //setup routes to start w/ the `#` symbol
    m.route.mode = "hash";
    //routing configuration
    m.route(document.getElementById('ui-router'), '/', {
        '/': require('./components/app.jsx')
    });
});

//setup routes to start w/ the `#` symbol
m.route.mode = "hash";
<% } else { %>
require([
    'jquery',
    'mithril',
    'components/app',<% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($, m, app) {
    $(document).ready(function() {
         /*App Module */
        //setup routes to start w/ the `#` symbol
        m.route.mode = "hash";
        //routing configuration
        m.route(document.getElementById('ui-router'), '/', {
            '/': app
        });
    });
});<% } %>
