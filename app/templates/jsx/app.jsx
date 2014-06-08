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
    return (
        <div className="container">
            <div className="header">
                <ul className="nav nav-pills pull-right">
                    <li className="active"><a href="#">Home</a>
                    </li>
                    <li><a href="#">About</a>
                    </li>
                    <li><a href="#">Contact</a>
                    </li>
                </ul>
                <h3 className="text-muted">Mithril<i className="fa fa-cog fa-spin"></i></h3>
            </div>

            <div className="jumbotron">
                <h1>'Allo, 'Allo!</h1>
                <p className="lead">Always a pleasure scaffolding your apps.</p>
                <p><a className="btn btn-lg btn-success" href="#">Splendid!</a>
                </p>
            </div>

            <div className="row marketing">
                <div className="col-lg-6">
                    <h4>HTML5 Boilerplate</h4>
                    <p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p>

                    <h4>Bootstrap</h4>
                    <p>Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.</p>

                    <h4>Modernizr</h4>
                    <p>Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites.</p>
                </div>
                <div className="col-lg-6">
                    <h4>Mithril</h4>
                    <p>Mithril is a client-side Javascript MVC framework, i.e. it's a tool to make application code divided into a data layer (called Model), a UI layer (called View), and a glue layer (called Controller)
                       Mithril is around 4kb gzipped thanks to its small, focused, API. It provides a templating engine with a virtual DOM diff implementation for performant rendering, utilities for high-level modelling via functional composition, as well as support for routing and componentization.
                   </p>
                   <input onchange={m.withAttr("value", ctrl.text)} value={ctrl.text()}/>
                     <button onclick={ctrl.add.bind(ctrl, ctrl.text)}>Add</button>
                     <table>
                       {ctrl.list.map(function(task, index) {
                         return <tr>
                           <td>
                             <input
                               type="checkbox"
                               onclick={m.withAttr("checked", task.done)}
                               checked={task.done()}
                              />
                           </td>
                           <td style={{textDecoration: task.done() ? "line-through" : "none"}}>
                             {task.text()}
                           </td>
                         </tr>
                       })}
                     </table>
                </div>
            </div>
            <div className="footer">
                <p>♥ from the Yeoman team</p>
            </div>
        </div>
    );
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
        return (
            <div className="container">
                <div className="header">
                    <ul className="nav nav-pills pull-right">
                        <li className="active"><a href="#">Home</a>
                        </li>
                        <li><a href="#">About</a>
                        </li>
                        <li><a href="#">Contact</a>
                        </li>
                    </ul>
                    <h3 className="text-muted">Mithril<i className="fa fa-cog fa-spin"></i></h3>
                </div>

                <div className="jumbotron">
                    <h1>'Allo, 'Allo!</h1>
                    <p className="lead">Always a pleasure scaffolding your apps.</p>
                    <p><a className="btn btn-lg btn-success" href="#">Splendid!</a>
                    </p>
                </div>

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4>HTML5 Boilerplate</h4>
                        <p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p>

                        <h4>Bootstrap</h4>
                        <p>Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.</p>

                        <h4>Modernizr</h4>
                        <p>Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites.</p>
                    </div>
                    <div className="col-lg-6">
                        <h4>Mithril</h4>
                        <p>Mithril is a client-side Javascript MVC framework, i.e. it's a tool to make application code divided into a data layer (called Model), a UI layer (called View), and a glue layer (called Controller)
                           Mithril is around 4kb gzipped thanks to its small, focused, API. It provides a templating engine with a virtual DOM diff implementation for performant rendering, utilities for high-level modelling via functional composition, as well as support for routing and componentization.
                       </p>
                       <input onchange={m.withAttr("value", ctrl.text)} value={ctrl.text()}/>
                         <button onclick={ctrl.add.bind(ctrl, ctrl.text)}>Add</button>
                         <table>
                           {ctrl.list.map(function(task, index) {
                             return <tr>
                               <td>
                                 <input
                                   type="checkbox"
                                   onclick={m.withAttr("checked", task.done)}
                                   checked={task.done()}
                                  />
                               </td>
                               <td style={{textDecoration: task.done() ? "line-through" : "none"}}>
                                 {task.text()}
                               </td>
                             </tr>
                           })}
                         </table>
                    </div>
                </div>
                <div className="footer">
                    <p>♥ from the Yeoman team</p>
                </div>
            </div>
        );
    };

    return app;
});<% } %>
