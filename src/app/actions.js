
'use strict';

var Constants = require("./constants");

var actions={
    addCart:function(book){
        this.dispatch(Constants.ADD_CART,{book:book});
    },
    deleteCart:function(book){
        this.dispatch(Constants.DELETE_CART,{book:book});
    }
};
module.exports=actions;