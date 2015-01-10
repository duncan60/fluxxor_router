/** @jsx React.DOM */

'use strict';

var React = require('react'),
	NotFound;

NotFound = React.createClass({
      render: function () {
        return (
          /*jshint ignore:start */
          <div>
            <h1>Not Found</h1>
          </div>
          /*jshint ignore:end */
        );
      }
});
module.exports = NotFound;