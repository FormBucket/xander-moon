/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import { Link } from "hrx";
import FontAwesome from "react-fontawesome";
import Nav from "./Nav";
import UserStore from "../stores/user";

class Header extends React.Component {
  render() {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <Link to="/" className="logo">
            <img src="/img/purple-logo.svg" alt="FormBucket" />
          </Link>
          <Nav />
        </div>
      </header>
    );
  }
}

export default Header;
