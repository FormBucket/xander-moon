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
              <h1>Every form needs a bucket</h1>
              <h2>Capture, protect, notify and automate submissions</h2>
              {IF(
                this.props.user && this.props.user.account_id,
                <div>
                  <button type="button" onClick={() => router.open("/buckets")}>
                    Return to buckets
                  </button>
                </div>,
                <div>
                  <button type="button" onClick={() => router.open("/signup")}>
                    Get Started
                  </button>
                  <p>14-Day Trial • No credit card to sign up!</p>
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
