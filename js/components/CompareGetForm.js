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
            <a href="https://www.formbucket.com">FormBucket</a> is a powerful{" "}
            <strong>
              alternative to <a href="https://www.getform.org">GetForm</a>
            </strong>. While GetForm does support file uploads (FormBucket
            currently doesn't), it lacks Spam Protection features,
            Autoresponders and Webhook support. GetForm also limits submissions
            for their free and paid plans.
          </p>
          <table>
            <thead>
              <tr>
                <th />
                <th>FormBucket</th>
                <th>GetForm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price per mo.</td>
                <td style={{ color: "red" }}>$7</td>
                <td>$0-$4*</td>
              </tr>
              <tr>
                <td># of Forms</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td># of Submissions</td>
                <td style={{ color: "green" }}>Unlimited</td>
                <td style={{ color: "red" }}>1000-100,000</td>
              </tr>
              <tr>
                <td>Hosted Endpoints</td>
                <td>Yes</td>
                <td>Yes</td>
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
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Realtime Notifications</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Spam Protection</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
              </tr>
              <tr>
                <td>Custom Autoresponders</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
              </tr>
              <tr>
                <td>Webhooks</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
              </tr>
              <tr>
                <td>SSL Encryption</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>File Uploads</td>
                <td style={{ color: "red" }}>No</td>
                <td style={{ color: "green" }}>Yes</td>
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
          <p>*Pricing data as published 12/04/16 on getform.org.</p>
        </div>
      </Layout>
    );
  }
};

export default Compare;