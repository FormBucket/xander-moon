/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';

var App;

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
export default App = React.createClass({
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div id="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
});
