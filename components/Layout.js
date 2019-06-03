/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import Header from "./Header";
import Footer from "./Footer";
import IF from "formula/src/branch";
import FlashMessage from "./FlashMessage";

import "./styles/app.scss";
import { TSImportEqualsDeclaration } from "babel-types";

/* Write some great components about what data
 * this application displays and how it needs to be
 * organized.
 */
class Layout extends Component {
  componentWillMount() {
    if (this.props.shouldLoadUser) {
      this.props.loadProfile();
    }
  }

  render() {
    var { status, trial_period_days, trial_start, has_source } =
      this.props.user || {};

    var days_remaining = (function() {
      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      var secondDate = new Date(trial_start);
      var firstDate = new Date();
      return (
        trial_period_days -
        Math.round(
          Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
        )
      );
    })();

    return (
      <div>
        {IF(
          this.props.user && !this.props.user.anonymous,
          null,
          status === "trialing" && !has_source,
          <div class="inline-error">
            <span>
              <strong>
                {days_remaining} of {trial_period_days} days left on free trial.{" "}
                {has_source}
              </strong>
            </span>
          </div>,
          status === "past_due",
          <div class="inline-error">
            <span>
              Please <a href="/account">update your billing info</a> to continue
              using FormBucket.
            </span>
          </div>,
          status === "canceled",
          <div class="inline-error">
            <span>
              Your account is not receiving submissions. Please{" "}
              <a href="/account">update your billing info</a>.
            </span>
          </div>,
          null
        )}
        <Header
          user={this.props.user}
          toggleMenu={this.props.toggleMenu}
          menuOn={this.props.menuOn}
        />
        <div class="error">{this.props.error}</div>
        <div class="main">{this.props.children}</div>
        <Footer />
        <FlashMessage text={this.context.store.getState().flash} />
      </div>
    );
  }
}

export default Layout;
