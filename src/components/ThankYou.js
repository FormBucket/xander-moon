var React = require('react');
var PropTypes = React.PropTypes;
var PageNotFound;

export default PageNotFound = React.createClass({

  render: function() {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Thank you</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>We will be in touch soon.</h2>
          <img src="/img/awesome.gif" alt="bucketkitty" />
        </div>
      </div>
    );
  }

});
