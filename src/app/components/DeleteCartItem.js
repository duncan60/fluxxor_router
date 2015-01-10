/** @jsx React.DOM */

'use strict';

var React = require('react'),
	DeleteCartItem;

DeleteCartItem = React.createClass({
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
		);
	}
});

module.exports = DeleteCartItem;