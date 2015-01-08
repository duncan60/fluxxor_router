
'use strict';

var Constants = require("./constants"),
	APIServices= require("./services/APIServices");

var actions={
	user:{
	    login: function() {  },
	    logout: function(){  }
	},
	getBookList:function(){
		this.dispatch(Constants.LOAD_BOOK_LIST,{msg:'get book list'});
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