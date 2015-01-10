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
	BooksDetial;

BooksDetial = React.createClass({
    /*jshint ignore:start */
    mixins: [Router.Navigation,Router.State,FluxMixin, StoreWatchMixin('MainStore')],
    /*jshint ignore:end */
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store('MainStore').getBooksList();
    },
    componentWillMount: function(){
        if(this.state.booksList.length===0){
            this.transitionTo('/');
        }
    },
    _addSelectBook: function(book){
        this.getFlux().actions.addCart(book);
    },
    _removeSelectBook: function(book){
        this.getFlux().actions.deleteCart(book);
    },
    render:function(){
        var selectId = this.getParams().selectId,
            book=this.state.booksList.filter(function(book) {
                return book.id === selectId;
            }),
            addClass=cx({
                'hide': book[0].select,
                'btn btn-default':true
            }),
            removeClass=cx({
                'hide': !book[0].select,
                'btn btn-default':true
            });
        return(
            /*jshint ignore:start */
            <div>
                詳細資料：
               <p> 書名：{book[0].name} 作者:{book[0].author}</p>
               <a className={addClass} onClick={this._addSelectBook.bind(this,book[0])} >add Cart</a>
               <a className={removeClass} onClick={this._removeSelectBook.bind(this,book[0])} >remove Cart</a>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = BooksDetial;