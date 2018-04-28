/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { signIn, getToken, loadProfile } from "../stores/ActionCreator";
import { IF } from "formula";
import { router } from "hrx";
import Layout from "./Layout";

let completeLogin = () => {
  // open buckets page.
  router.open("/buckets");
};

class Login extends React.Component {
  state = {
    loading: false,
    error: false
  };

  componentDidMount() {
    if (this.props.router.location.query.code) {
      getToken(this.props.router.location.query.code).then(
        completeLogin,
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
    }
  }

  handleClick = () => {
    this.setState({ loading: true, error: false });
    signIn(this.refs.email.value, this.refs.password.value)
      .then(loadProfile)
      .then(
        () => router.open("/buckets"),
        error => {
          this.setState({
            loading: false,
            error: JSON.parse(error.message)
          });
        }
      );
  };

  handleClickReset = () => {
    router.open("/password_reset");
  };

  handleKeyPress = event => {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick();
    }
  };

  render() {
    if (this.props.router.location.query.code) {
      return <div>Loading...</div>;
    }

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Login</h1>
          </div>
        </div>
        <div className="wrapper">
          <div id="login-wrapper">
            <div
              style={{
                padding: 10,
                marginBottom: 10,
                background: "red",
                color: "white",
                display: this.state.error ? "" : "none"
              }}
            >
              {this.state.error ? this.state.error.message : ""}
            </div>

            <div className="google-login">
              <a
                href={process.env.FORMBUCKET_API_SERVER + "/connect/google"}
                alt="Sign in with Google"
              >
                <img src="img/btn_google_signin_dark_normal_web@2x.png" />
              </a>
            </div>

            <div className="login-divider">
              <div />
              <div>or</div>
              <div />
            </div>

            <div className="login-form">
              <label>
                Email:
                <input
                  name="email"
                  ref="email"
                  type="email"
                  onKeyUp={this.handleKeyPress}
                />
              </label>
              <label>
                Password:
                <input
                  name="password"
                  ref="password"
                  type="password"
                  onKeyUp={this.handleKeyPress}
                />
              </label>
              <input
                onClick={this.handleClick}
                type="button"
                value="Login"
                disabled={this.state.loading}
              />

              <a
                className="pull-right"
                href="javascript:void(0)"
                onClick={this.handleClickReset}
              >
                Forgot your password?
              </a>
              {IF(
                this.state.loading,
                <p>
                  <FontAwesome name="fa fa-spinner" /> Logging in
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
