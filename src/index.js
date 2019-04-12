/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
window.FORMBUCKET_API_SERVER = process.env.FORMBUCKET_API_SERVER;
import "regenerator-runtime/runtime";

import { h, render, Component } from "preact";
import { Provider, connect } from "unistore/preact";
import { Router, route } from "preact-router";
import AsyncRoute from "preact-async-route";
import { store, actions } from "./store";

// send route location changes to Intercom.ActionCreator
if (window.Intercom) {
  window.Intercom("boot", {
    app_id: "n2h7hsol"
  });
} else {
  // console.log("window.Intercom is not defined");
}

class Redirect extends Component {
  componentWillMount() {
    route(this.props.to(this.props.matches), this.props.replace || false);
  }

  render() {
    return null;
  }
}

window.actions = actions;
window.store = store;

class App extends Component {
  // some method that returns a promise
  isAuthenticated() {}

  handleRoute = async e => {
    window.scrollTo(0, 0);
    // actions(store).toggleMenuOff();
    if (window.Intercom) {
      window.Intercom("update");
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Router onChange={this.handleRoute}>
          <AsyncRoute
            path="/"
            getComponent={() =>
              import("../pages/Home").then(module => module.default)
            }
          />
          <Redirect
            path="/pricing"
            replace={true}
            to={({}) => `/guides/pricing`}
          />
          <AsyncRoute
            path="/about"
            getComponent={() =>
              import("../pages/About").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/account"
            getComponent={() =>
              import("../pages/Account").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/account/invoices"
            getComponent={() =>
              import("../pages/Invoices").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/buckets"
            getComponent={() =>
              import("../pages/Buckets").then(module => module.default)
            }
            Redirect
          />
          <AsyncRoute
            path="/buckets/:id/settings"
            getComponent={() =>
              import("../pages/Bucket").then(module => module.default)
            }
          />
          <Redirect
            path="/buckets/:id/submissions"
            replace={true}
            to={({ id }) =>
              form`/buckets/${id}/submissions/list/0/50/data,created_on`
            }
          />
          <Redirect
            path="/privacy-policy"
            replace={true}
            to={({}) => `/docs/privacy-policy`}
          />
          <Redirect
            path="/privacy"
            replace={true}
            to={({}) => `/docs/privacy-policy`}
          />
          <Redirect path="/terms" replace={true} to={({}) => `/docs/terms`} />

          <AsyncRoute
            path="/formbucket-vs-formkeep"
            getComponent={() =>
              import("../pages/CompareFormKeep").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/formbucket-vs-formspree"
            getComponent={() =>
              import("../pages/CompareFormSpree").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/formbucket-vs-getform"
            getComponent={() =>
              import("../pages/CompareGetForm").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/formbucket-vs-wufoo"
            getComponent={() =>
              import("../pages/CompareWufoo").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/buckets/:id/submissions/:mode/:offset/:limit/:select"
            getComponent={() =>
              import("../pages/Submissions").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/contact"
            getComponent={() =>
              import("../pages/Contact").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides"
            getComponent={() =>
              import("../pages/Guides").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/pricing"
            getComponent={() =>
              import("../pages/GuidePricing").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/query"
            getComponent={() =>
              import("../pages/GuideGraphQL").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/howto-setup-recaptcha"
            getComponent={() =>
              import("../pages/GuideRecaptcha").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/honeypot"
            getComponent={() =>
              import("../pages/GuideHoneyPot").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/collect-emails-for-newsletter-with-jquery"
            getComponent={() =>
              import("../pages/GuideNewsletter").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/merge-tags"
            getComponent={() =>
              import("../pages/GuideMergeTags").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/guides/radio-buttons"
            getComponent={() =>
              import("../pages/GuideRadioButtons").then(
                module => module.default
              )
            }
          />

          <AsyncRoute
            path="/guides/json-endpoints"
            getComponent={() =>
              import("../pages/GuideJSONEndpoints").then(
                module => module.default
              )
            }
          />

          <AsyncRoute
            path="/docs/webhooks"
            getComponent={() =>
              import("../pages/GuideWebhooks").then(module => module.default)
            }
          />

          <Redirect
            path="/gdpr"
            to={({}) => `/docs/general-data-protection-regulation`}
          />

          <AsyncRoute
            path="/docs/general-data-protection-regulation"
            getComponent={() =>
              import("../pages/GuideGDPR").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/docs/terms"
            getComponent={() =>
              import("../pages/Terms").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/docs/privacy-policy"
            getComponent={() =>
              import("../pages/Privacy").then(module => module.default)
            }
          />

          <AsyncRoute
            path="/logs"
            getComponent={() =>
              import("../pages/Logs").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/log/:id"
            getComponent={() =>
              import("../pages/Log").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/notifications"
            getComponent={() =>
              import("../pages/Notifications").then(module => module.default)
            }
          />
          <AsyncRoute
            path="/query"
            getComponent={() =>
              import("../pages/Query").then(module => module.default)
            }
          />
          <AsyncRoute
            default
            getComponent={() =>
              import("../pages/PageNotFound").then(module => module.default)
            }
          />
        </Router>
      </Provider>
    );
  }
}

// launch React App
render(<App />, document.getElementById("formbucket-root"));

if (module.hot) {
  require("preact/debug");
  module.hot.accept(function() {
    window.location.reload();
  });
}
