'use strict';

var Fluxxor = require('fluxxor'), 
    Constants = require('../constants'),
    MainStore;
MainStore = Fluxxor.createStore({
    initialize : function(){
        this.booksList = [
            {   
                id:1,
                name:'book1',
                author:'author A'
            },
            {   
                id:2,
                name:'book2',
                author:'author B'
            },
            {   
                id:3,
                name:'book3',
                author:'author C'
            }
        ];
        this.cartsList=[ {   
                id:2,
                name:'book2',
                author:'author B'
            }];
        this.bindActions(
            Constants.ADD_CART,this.onAddCart,
            Constants.DELETE_CART,this.onDeleteCart
        );
    },
    onAddCart:function(playload){
        this.cartsList.push(playload.book);
        this.emit('change');
    },
    onDeleteCart:function(playload){
        var idx=this.cartsList.indexOf(playload.book);
        this.cartsList.splice(idx,1);
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