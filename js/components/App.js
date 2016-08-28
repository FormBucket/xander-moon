/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
const App = React.createClass({
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
});

export default App
