/*
 * API Services
 */
'use strict';

var APIServices;

APIServices = (function() {
    var API_URL = '',
        TICKET = '',
        API = {
            BOOKLIST: 'bookList.txt',
           
        };
    return {
        init: function() {
          
        },
        create: function(args) {
            var argsPath = args.path,
                promise = $.ajax({
                    url: API_URL+argsPath+'/',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    data: JSON.stringify(args.data),
                    contentType: 'application/json; charset=utf-8'
                });
            return promise;
        },
        update: function(args) {
            var argsPath = args.path,
                promise = $.ajax({
                    url: API_URL+argsPath+'/',
                    type: 'PUT',
                    dataType: 'json',
                    cache: false,
                    data: JSON.stringify(args.data),
                    contentType: 'application/json; charset=utf-8'
                });
            return promise;
        },
        where: function(args) {
            var argsPath = args.path,
                argsData = encodeURI(JSON.stringify(args.data)),
                promise = $.ajax({
                    url: API_URL+argsPath+'/?req='+argsData,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    contentType: 'application/json; charset=utf-8'
                });
            return promise;
        },
        getJson: function(args){
            var promise= $.ajax({
                  dataType: 'json',
                  url: args.path,
                });

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
