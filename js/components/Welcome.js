/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";
import { IF } from "formula";
import { server } from "../stores/webutils";
import FontAwesome from "react-fontawesome";
import { router } from "xander";
import routes from "../routes";
import Header from "./Header";
import Footer from "./Footer";

class Welcome extends React.Component {
  state = {
    BelowTheFold: () => null
  };

  componentDidMount() {
    System.import("./WelcomeBelowFold").then(module => {
      console.log("got module for below fold", module);
      this.setState({ BelowTheFold: module.default });
    });
  }

  render() {
    let { BelowTheFold } = this.state;
    return (
      <div>
        <Header />
        <div className="hero">
          <div className="bubbles">
            <div className="wrapper">
              <h1>Forms for static sites</h1>
              <h2>
                With FormBucket you get simple form handling, alerts and more
                with no servers to setup or manage.
              </h2>
              {IF(
                this.props.user && !this.props.user.anonymous,
                <div>
                  <button type="button" onClick={() => router.open("/buckets")}>
                    Return to buckets
                  </button>
                </div>,
                <div>
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Get Started
                  </button>
                  <p>14-Day Trial • No credit card to sign up!</p>
                  <p>$7/mo for unlimited usage.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <BelowTheFold {...this.props} />
        <Footer />
      </div>
    );
  }
}

export default Welcome;
