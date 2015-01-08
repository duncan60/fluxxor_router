'use strict';

var Fluxxor = require('fluxxor'), 
    Constants = require('../constants'),
    MainStore;
MainStore = Fluxxor.createStore({
    initialize : function(){
        this.booksList = [];
        this.cartsList=[];
        this.bindActions(
            Constants.LOAD_BOOK_LIST,this.onLoadBookList,
            Constants.LOAD_BOOK_LIST_SUCCESS,this.onLoadBookListSucess,
            Constants.LOAD_FAIL,this.onloadFail,

            Constants.ADD_CART,this.onAddCart,
            Constants.DELETE_CART,this.onDeleteCart
        );
    },
    onLoadBookList:function(){

    },
    onLoadBookListSucess:function(res){
        this.booksList=res.data.bookList;
        this.emit('change');
    },
    onloadFail:function(res){
        this.emit('change');
    },
    onAddCart:function(playload){
        var idx=this.booksList.indexOf(playload.book);
        this.cartsList.push(playload.book);
        this.booksList[idx].select=true;
        this.emit('change');
    },
    onDeleteCart:function(playload){
        var idx=this.cartsList.indexOf(playload.book);
        this.cartsList.splice(idx,1);
        idx=this.booksList.indexOf(playload.book);
        this.booksList[idx].select=false;
        this.emit('change');
    },
    getBooksList: function() {
        return {
          booksList: this.booksList
        };
    },
    getBooksCart: function(){
        return {
          cartsList: this.cartsList
        };
    }
});

module.exports=MainStore;