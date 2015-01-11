/** @jsx React.DOM */

'use strict';

var React = require('react'),
	cx=React.addons.classSet,
	//router
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    Link = Router.Link,
     //fluxxor
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    Constants = require('../constants'),
    Actions = require('../actions'),
    BookStore = require('../stores/BookStore'),

	BooksList;

BooksList = React.createClass({
    /*jshint ignore:start */
    mixins: [Router.Navigation,FluxMixin, StoreWatchMixin('BookStore')],
    /*jshint ignore:end */
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store('BookStore').getBooksList ();
    },
    componentWillMount: function(){
        this.transitionTo('/BooksList/1');
    },
    render: function () {
        return (
            /*jshint ignore:start */
        	<div>
	            <h1>Books List</h1>
	            <ul className='list-group'>
	                {this.state.booksList.map(function(book,i){
	                    var spanClass=cx({
	                    	  'glyphicon glyphicon-shopping-cart': book.select
	                   		 });
	                  	return  (
		                  	<li className='list-group-item' key={i}>
	              				<Link to='select' params={{selectId: book.id}}>{book.name}</Link>
	              				<span className={spanClass}></span>
	              			</li>
              			);
	                })}
	            </ul>
	            <div className='content'>
	                <RouteHandler />
	            </div>
	        </div>
          /*jshint ignore:end */
        );
    }
});

module.exports = BooksList;