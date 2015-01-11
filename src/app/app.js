/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Addons = require('react/addons'),
    //router
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    NotFoundRoute = Router.NotFoundRoute,
    Link = Router.Link,
    //fluxxor
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    Constants = require('./constants'),
    Actions = require('./actions'),
    BookStore = require('./stores/BookStore'),
    NewsStore = require('./stores/NewsStore'),
    //page
    Index=require('./pages/Index'),
    NotFound=require('./pages/NotFound'),
    BooksList=require('./pages/BooksList'),
    BooksCart=require('./pages/BooksCart'),
    //components
    BookDetial=require('./components/BookDetial'),
    Badge=require('./components/Badge'),
    //app
    App;

/*
 *fluxxor
*/
var stores = {
    BookStore:new BookStore(),
    NewsStore:new NewsStore()
};  

var flux = new Fluxxor.Flux(stores,Actions);

flux.on('dispatch', function(type, payload) {
    if (console && console.log) {
        console.log('[Dispatch]', type, payload);
    }
});

App = React.createClass({
    mixins: [FluxMixin],
    componentDidMount: function(){
        this.getFlux().actions.getBookList();
        this.getFlux().actions.getNewsList();
    },
    render: function() {
        return (
        	/*jshint ignore:start */
          <div>
            <header>
              <nav className='navbar navbar-default'>
                <ul className='nav navbar-nav'>
                  <li><Link to='app'>Index</Link></li>
                  <li><Link to='BooksList'>Books List</Link></li>
                  <li><Link to='BooksCart'>Books Cars<Badge/></Link></li>
                </ul>  
              </nav>
            </header>
            {/* this is the important part */}
            <RouteHandler />
          </div>
          /*jshint ignore:end */
        );
    }
});

var routes = (
  /*jshint ignore:start */
  <Route name='app' path='/' handler={App}>
      <Route name='BooksList' handler={BooksList}>
          <Route path=':selectId' name='select' handler={BookDetial}/>
      </Route>
      <Route name='BooksCart' handler={BooksCart}/>
      <DefaultRoute  handler={Index}/>
      <NotFoundRoute handler={NotFound}/>
  </Route>
  /*jshint ignore:end */ 
);
/*jshint ignore:start */
Router.run(routes,Router.HistoryLocation, function (Handler,state) {
    React.render(<Handler flux={flux} />, document.getElementById('app'));
});
/*jshint ignore:end */ 

