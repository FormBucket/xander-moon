var React = require('react');
var PropTypes = React.PropTypes;
var PageNotFound;

export default PageNotFound = class extends React.Component {
  render() {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Page Not Found</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>Maybe Buckitty can find it?</h2>
          <img src="/img/bucketkitty.gif" alt="bucketkitty" />
        </div>
      </div>
    );
  }
};
