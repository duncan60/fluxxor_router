/** @jsx React.DOM */

'use strict';

var React = require('react'),
    //fluxxor
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    Index;

Index = React.createClass({
    /*jshint ignore:start */
    mixins: [FluxMixin, StoreWatchMixin('BookStore','NewsStore')],
    /*jshint ignore:end */
    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        book:flux.store('BookStore').getBooksList(),
        news:flux.store('NewsStore').getNewsList()
      };
    },
    componentWillMount: function(){
        console.log(this.state);
    },
    render: function () {
      return (
        /*jshint ignore:start */
        <div>
          <h2>NEWS</h2>
          <ul className='list-group'>
            {this.state.news.newsList.map(function(news,i){
              return (
                <li key={i} className='list-group-item'>
                    {news.date} - {news.title} - {news.summary}
                </li>
              )}
            )}
          </ul>
          <h2>Books</h2>
          <ul className='list-group'>
            {this.state.book.booksList.map(function(book,i){
              return (
                <li key={i} className='list-group-item'>
                    書名：{book.name} 作者：{book.author}
                    <a href={"#/BooksList/"+book.id} className='btn btn-default'>more</a>
                </li>
              )}
            )}
          </ul>
        </div>
        /*jshint ignore:end */
      );
    }
});
module.exports = Index;