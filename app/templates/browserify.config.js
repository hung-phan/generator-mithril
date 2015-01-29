//third party libraries alias configurations for browserify
module.exports = [<% if (includeLodash) { %>
    './app/bower_components/lodash/lodash.js:lodash',<% } %>
    './app/bower_components/mithril/mithril.js:mithril',<% if (cssFramework === 'SASSBootstrap') { %>
    './app/bower_components/sass-bootstrap/dist/js/bootstrap.js:bootstrap',<% } %>
    './app/bower_components/jquery/dist/jquery.js:jquery'
];

