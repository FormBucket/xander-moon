/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import Nav from "./Nav";
import logo from "../img/logo.svg";
const Header = props => (
  <header class="navigation" role="banner">
    <div class="navigation-wrapper">
      <a href="/" class="logo">
        <img src={logo} alt="FormBucket" />
      </a>
      <Nav {...props} />
    </div>
  </header>
);
export default Header;
