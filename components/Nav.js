/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";

const Nav = ({ show, user, toggleMenu }) => (
  <nav role="navigation">
    <a href="#" class="navigation-menu-button" onClick={toggleMenu}>
      MENU
    </a>
    {user && !user.anonymous ? (
      <ul class={"navigation-menu" + (show ? " show" : " hide")}>
        <li class="nav-link">
          <a href="/guides">Guides</a>
        </li>
        <li class="nav-link">
          <a href="/buckets">Buckets</a>
        </li>
        <li class="nav-link">
          <a href="/account">Account</a>
        </li>
      </ul>
    ) : (
      <ul
        id="js-navigation-menu"
        class={"navigation-menu" + (show ? " show" : " hide")}
      >
        <li class="nav-link">
          <a href="/guides/pricing">Pricing</a>
        </li>
        <li class="nav-link">
          <a href="/signup?redirect_uri=/buckets" native>
            Apply
          </a>
        </li>
        <li class="nav-link">
          <a href="/login?redirect_uri=/buckets" native>
            Login
          </a>
        </li>
      </ul>
    )}
  </nav>
);

export default Nav;
