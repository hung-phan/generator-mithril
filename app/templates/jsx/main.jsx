/** @jsx m */
'use strict';<% if (moduleLoader === 'browserify') { %>

var $ = require('jquery');
window.jQuery = $;<% if (includeLodash) { %>
var lodash = require('lodash');
window._ = lodash;<% } %>
require('bootstrap');

<% } else { %>
require([
    'jquery',<% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($) {
    $(document).ready(function() {
        /* App Module */

    });
});<% } %>
