
'use strict';

var Constants = require('./constants'),
	APIServices= require('./services/APIServices');

var actions={
	//Namespaced Actions
	user:{
	    login: function() {  },
	    logout: function(){  }
	},
	getNewsList:function(){
		APIServices.getNewsList().then(
			function(res){
				this.dispatch(Constants.LOAD_NEWS_LIST_SUCCESS,{data:res});
			}.bind(this),
			function(err) {
		  		
			}.bind(this)
		);
	},
	getBookList:function(){
		//if should  add start event listener , you can add actions  
		//this.dispatch(Constants.LOAD_BOOK_LIST,{msg:'get book list'});
		APIServices.getBookList().then(
			function(res){
				this.dispatch(Constants.LOAD_BOOK_LIST_SUCCESS,{data:res});
			}.bind(this),
			function(err) {
		  		this.dispatch(Constants.LOAD_FAIL,{res:err});
			}.bind(this)
		);
	},
    addCart:function(book){
        this.dispatch(Constants.ADD_CART,{book:book});
    },
    deleteCart:function(book){
        this.dispatch(Constants.DELETE_CART,{book:book});
    }
};
module.exports=actions;