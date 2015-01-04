/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Addons = require('react/addons'),
    //router
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    Link = Router.Link,
    //fluxxor
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    Constants = require("./constants"),
    Actions = require("./actions"),
    MainStore = require("./stores/MainStore"),
    //app
    App;

/*
 *fluxxor
*/
var stores = {
    MainStore:new MainStore()
};

var flux = new Fluxxor.Flux(stores,Actions);

flux.on('dispatch', function(type, payload) {
  if (console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});

/*
*page
*/
var BooksList = React.createClass({
        mixins: [FluxMixin, StoreWatchMixin('MainStore')],
        getStateFromFlux: function() {
            var flux = this.getFlux();
            return flux.store('MainStore').getBooksList ();
        },
        render: function () {
            return (
                /*jshint ignore:start */
              <div>
                <h1>Books List</h1>
                <ul className='list-group'>
                    {this.state.booksList.map(function(book,i){
                      return  <li className='list-group-item' key={i}><Link to='select' params={{selectId: book.id}}>{book.name}</Link></li>;
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
var BookDetial = React.createClass({
        mixins: [ Router.State,FluxMixin, StoreWatchMixin('MainStore')],
        detail:[],
        getStateFromFlux: function() {
            var flux = this.getFlux();
            return flux.store('MainStore').getBooksList();
        },
        addSelectBook: function(){
            this.getFlux().actions.addCart(this.detail[0]);
        },
        componentDidMount: function() {
          
        },
        render:function(){
            var selectId = this.getParams().selectId;
            this.detail = this.state.booksList.filter(function(book) {
                return book.id == selectId;
            });
            return(
                /*jshint ignore:start */
                <div>
                    詳細資料：
                   <p> 書名：{this.detail[0].name} 作者:{this.detail[0].author}</p>
                   <a className='btn btn-default' onClick={this.addSelectBook} >add Cart</a>
                </div>
                /*jshint ignore:end */
            );
        }
});


var DeleteCartItem = React.createClass({
  propTypes: {
    deleteCarts: React.PropTypes.func,
    book: React.PropTypes.object.isRequired
  },
  getDefaultProps: function() {
    return {
      deleteCarts:function(){},
      book: {}
    };
  },
  deleteBook: function(){
    this.props.deleteCarts(this.props.book);
  },
  render: function(){
    return (
      /*jshint ignore:start */
      <li className='list-group-item'>
          書名：{this.props.book.name} 作者:{this.props.book.author} <a className='btn btn-default' onClick={this.deleteBook}> delete </a>
      </li>
      /*jshint ignore:end */
    )
  }
});

var BooksCart = React.createClass({
      mixins: [FluxMixin, StoreWatchMixin('MainStore')],
      getStateFromFlux: function() {
          var flux = this.getFlux();
          return flux.store('MainStore').getBooksCart();
      },
      componentDidMount: function() {
          
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


var Index = React.createClass({
      render: function () {
        return (
          /*jshint ignore:start */
          <div>
            <h1>Index</h1>
          </div>
          /*jshint ignore:end */
        );
      }
});

var Label = React.createClass({
      mixins: [FluxMixin, StoreWatchMixin('MainStore')],
      getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store('MainStore').getBooksCart();
      },
      render: function(){
        var cx = React.addons.classSet,
        hiedClass=cx({
          'hide': this.state.cartsList.length>0?false:true,
          'label': true,
          'label-default':true
        });
        return(
          /*jshint ignore:start */
          <span className={hiedClass}>{this.state.cartsList.length}</span>
          /*jshint ignore:end */
        );
      }
})

App = React.createClass({
    render: function() {
        return (
        	/*jshint ignore:start */
          <div>
            <header>
              <nav className='navbar navbar-default'>
                <ul className='nav navbar-nav'>
                  <li><Link to='app'>Index</Link></li>
                  <li><Link to='BooksList'>Books List</Link></li>
                  <li><Link to='BooksCart'>Books Cars<Label flux={flux} /></Link></li>
                </ul>  
              </nav>
            </header>
            {/* this is the important part */}
            <RouteHandler flux={flux} />
          </div>
          /*jshint ignore:end */
        );
    }
});

var routes = (
  /*jshint ignore:start */
  <Route name='app' path='/' handler={App} location='histroy'>
    <Route name='BooksList' handler={BooksList}>
        <Route path=':selectId' name='select' handler={BookDetial}/>
    </Route>
    <Route name='BooksCart' handler={BooksCart}/>
    <DefaultRoute handler={Index}/>
  </Route>
  /*jshint ignore:end */ 
);
/*jshint ignore:start */
Router.run(routes, function (Handler,state) {
    React.render(<Handler />, document.getElementById('app'));
});
/*jshint ignore:end */ 

