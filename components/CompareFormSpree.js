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
            <a href="https://www.formbucket.com">FormBucket</a> is a more
            powerful{" "}
            <strong>
              alternative to <a href="https://www.formspree.io">Formspree</a>
            </strong>, and costs half as much as Formspree's Gold Plan.
            Additionally, Formspree requires the use of inline name attributes
            in your markup to configure your form settings (including exposing
            your email address). With FormBucket, these configurations are saved
            in your form settings and baked right into your unique endpoint URL,
            keeping your markup nice and tidy.
          </p>
          <table>
            <thead>
              <tr>
                <th />
                <th>FormBucket</th>
                <th>Formspree</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price per mo.</td>
                <td>$7</td>
                <td>$0-$9.99*</td>
              </tr>
              <tr>
                <td># of Forms</td>
                <td>Unlimited</td>
                <td style={{ color: "orange" }}>?</td>
              </tr>
              <tr>
                <td># of Submissions</td>
                <td style={{ color: "green" }}>Unlimited</td>
                <td style={{ color: "orange" }}>1000-Unlimited</td>
              </tr>
              <tr>
                <td>Hosted Endpoints</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Submission Dashboard</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "orange" }}>Limited</td>
              </tr>
              <tr>
                <td>URL Redirects</td>
                <td style={{ color: "green" }}>Yes</td>
                <td style={{ color: "red" }}>No</td>
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
            </tbody>
          </table>
          <div class="callout">
            <div class="signup">
              <a href="/signup" class="button">
                Get Started with FormBucket
              </a>
            </div>
          </div>
          <p>*Pricing data as published 12/04/16 on Formspree.io.</p>
        </div>
      </div>
    );
  }
};

export default Compare;
