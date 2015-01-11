/*
 * API Services
 */
'use strict';

var APIServices;

APIServices = (function() {
    var API = {
            NEWSLIST: 'NewsList.txt',
            BOOKLIST: 'bookList.txt'
        };
    return {
        getJson: function(args){
            var promise= $.ajax({
                  dataType: 'json',
                  url: args.path,
                });
            return promise;
        },
        getNewsList: function() {
            var args = {
                    path: API.NEWSLIST
                },
            promise = this.getJson(args);
            return promise;
        },
        getBookList: function() {
            var args = {
                    path: API.BOOKLIST
                },
            promise = this.getJson(args);
            return promise;
        }
    };
})();

module.exports = APIServices;
