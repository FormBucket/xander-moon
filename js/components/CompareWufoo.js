/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

var React = require("react");
var PropTypes = React.PropTypes;
import Layout from "./Layout";
import Loader from "./Loader";

let Compare = class extends React.Component {
  render() {
    return (
      <Layout>
        <div className="wrapper">
          <h2>
            <a id="How_do_they_stack_up_0" />How do they compare?
          </h2>
          <p>
            <a href="https://www.formbucket.com">FormBucket</a> is a hosted
            endpoint{" "}
            <strong>
              alternative to <a href="https://www.wufoo.com">Wufoo</a>
            </strong>. Wufoo provides a drag and drop builder that requires you
            to embed their form in your project. By comparison, FormBucket gives
            you the freedom to use your own HTML and CSS, then simply copy and
            paste our magic endpoint URL into your markup.
          </p>
          <p>
            While Wufoo's embeds or iframes can make implementation more
            convenient, it creates a situation where you can spend a lot of time
            overriding their CSS to make your form blend in with the rest of
            your website. It can also create usability issues on different sized
            viewports like mobile devices.
          </p>
          <p>
            The bottom line is if you are comfortable writing your own form
            HTML, FormBucket is a great alternative to Wufoo.
          </p>
          <table>
            <thead>
              <tr>
                <th />
                <th>FormBucket</th>
                <th>Wufoo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price per mo.</td>
                <td>$7</td>
                <td>$0-$69.95*</td>
              </tr>
              <tr>
                <td># of Forms</td>
                <td style={{ color: "green" }}>Unlimited</td>
                <td style={{ color: "orange" }}>3-Unlimited</td>
              </tr>
              <tr>
                <td># of Submissions</td>
                <td style={{ color: "green" }}>Unlimited</td>
                <td style={{ color: "red" }}>1000-15,000</td>
              </tr>
              <tr>
                <td>Hosted Endpoints</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
              </tr>
              <tr>
                <td>Submission Dashboard</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>URL Redirects</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>AJAX Support</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
              </tr>
              <tr>
                <td>Realtime Notifications</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Spam Protection</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Custom Autoresponders</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Webhooks</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>SSL Encryption</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
          <div className="callout">
            <div className="signup">
              <a href="/signup" className="button">
                Get Started with FormBucket
              </a>
            </div>
          </div>
          <p>*Pricing data as published 12/04/16 on wufoo.com.</p>
        </div>
      </Layout>
    );
  }
};

export default Compare;
