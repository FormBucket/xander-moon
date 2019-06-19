/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import logo from "../img/logo.svg";
import { white } from "ansi-colors";

const Nav = ({ menuOn, user, toggleMenu }) => (
  <nav role="navigation">
    <a href="#" class="navigation-menu-button" onClick={toggleMenu}>
      MENU
    </a>
    {user && !user.anonymous ? (
      <ul class={"navigation-menu" + (menuOn ? " show" : " hide")}>
        <li class="nav-link">
          <a href="https://twitter.com/formbucket" target="blank">
            <i
              class="fa fa-twitter"
              aria-hidden="true"
              alt="Twitter"
              style={{ color: "white", fontSize: "1.5em", padding: 10 }}
            />
          </a>
          <a href="https://github.com/formbucket" target="blank">
            <i
              class="fa fa-github"
              aria-hidden="true"
              alt="Github"
              style={{ color: "white", fontSize: "1.5em", padding: 10 }}
            />
          </a>
        </li>
        <li class="nav-link">
          <a href="/guides" onClick={toggleMenu}>
            Guides
          </a>
        </li>
        <li class="nav-link">
          <a href="/buckets" onClick={toggleMenu}>
            Buckets
          </a>
        </li>
        <li class="nav-link">
          <a href="/account" onClick={toggleMenu}>
            Account
          </a>
        </li>
      </ul>
    ) : (
      <ul
        id="js-navigation-menu"
        class={"navigation-menu" + (menuOn ? " show" : " hide")}
      >
        <li class="nav-link">
          <a href="https://twitter.com/formbucket" target="blank">
            <i
              class="fa fa-twitter"
              aria-hidden="true"
              alt="Twitter"
              style={{ color: "white", fontSize: "1.5em", padding: 10 }}
            />
          </a>
          <a href="https://github.com/formbucket" target="blank">
            <i
              class="fa fa-github"
              aria-hidden="true"
              alt="Github"
              style={{ color: "white", fontSize: "1.5em", padding: 10 }}
            />
          </a>
        </li>
        <li class="nav-link">
          <a href="/guides">Guides</a>
        </li>
        <li class="nav-link">
          <a href="/signup?redirect_uri=/buckets" native>
            Sign up
          </a>
        </li>
        <li class="nav-link">
          <a
            href={
              "/login?redirect_uri=" + encodeURIComponent(window.location.href)
            }
            native
          >
            Login
          </a>
        </li>
      </ul>
    )}
  </nav>
);

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
