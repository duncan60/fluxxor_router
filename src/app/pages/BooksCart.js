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
    MainStore = require('../stores/MainStore'),
    DeleteCartItem=require('../components/DeleteCartItem'),
	BooksCart;

BooksCart = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MainStore')],
    getStateFromFlux: function() {
      var flux = this.getFlux();
      return flux.store('MainStore').getBooksCart();
    },
    deleteCarts: function(book){
      this.getFlux().actions.deleteCart(book);
    },
    render: function () {
        var that = this;
        return (
          /*jshint ignore:start */
          <div>
            <h1>Books Cart</h1>
            <ul className='list-group'>
                {this.state.cartsList.map(function(book,i){
                    return  <DeleteCartItem key={i} book={book} deleteCarts={that.deleteCarts} />
                  }.bind(that)
                )}
            </ul>
          </div>
          /*jshint ignore:end */
        );
    }
});

module.exports = BooksCart;