/** @jsx React.DOM */

'use strict';

var React = require('react'),
    cx = React.addons.classSet,
     //fluxxor
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    BookStore = require('../stores/BookStore'),
    Badge;

Badge = React.createClass({
    /*jshint ignore:start */
    mixins: [FluxMixin, StoreWatchMixin('BookStore')],
    /*jshint ignore:end */
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store('BookStore').getBooksCart();
    },
    render: function(){
        var hiedClass=cx({
              'hide': this.state.cartsList.length>0?false:true,
              'badge': true
            });
        return(
            /*jshint ignore:start */
            <span className={hiedClass}>{this.state.cartsList.length}</span>
            /*jshint ignore:end */
        );
    }
});

module.exports = Badge;