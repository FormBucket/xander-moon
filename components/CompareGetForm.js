/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";

let Compare = class extends Component {
  render() {
    return (
      <div>
        <div class="wrapper">
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
                <td>$0-$57.5*</td>
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
          <div class="callout">
            <div class="signup">
              <a href="/signup" class="button">
                Get Started with FormBucket
              </a>
            </div>
          </div>
          <p>*Pricing data as published 3/16/19 on getform.org.</p>
        </div>
      </div>
    );
  }
};

export default Compare;
