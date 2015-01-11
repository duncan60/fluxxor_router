'use strict';

var Fluxxor = require('fluxxor'), 
    Constants = require('../constants'),
    NewsStore;
NewsStore = Fluxxor.createStore({
    initialize : function(){
        this.newsList = [];
        this.bindActions(
            Constants.LOAD_NEWS_LIST_SUCCESS,this.onLoadNewsListSucess
        );
    },
    onLoadNewsListSucess:function(res){
        this.newsList=res.data.newsList;
        this.emit('change');
    },
    getNewsList: function(){
        return {
          newsList: this.newsList
        };
    }
});

module.exports=NewsStore;