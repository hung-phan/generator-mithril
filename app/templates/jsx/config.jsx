requirejs.config({
    baseUrl: './scripts',
    paths: {
        'mithril': '../bower_components/mithril/mithril',
        'jquery': '../bower_components/jquery/dist/jquery',<% if (includeLodash) { %>
        'lodash': '../bower_components/lodash/lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
    },
    shim: {<% if (includeLodash) { %>
        'lodash': { exports: '_' },<% } %>
        'mithril': { exports: 'm' },
        'bootstrap': ['jquery']
    }
});
