var React = require('react');
var PropTypes = React.PropTypes;
var PageNotFound;

export default PageNotFound = React.createClass({

  render: function() {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Message received!</h1>
          </div>
        </div>
        <div className="wrapper">
	  <button onClick={() => this.props.history.push('/signup')}>Make your own forms</button><br/><br/>
          <img src="/img/awesome.gif" alt="bucketkitty" />
        </div>
      </div>
    );
  }

});
