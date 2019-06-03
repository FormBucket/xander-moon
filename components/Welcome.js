/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import "./styles/welcome.scss";
import Contact from "./Contact";
const Clincher = () => (
  <div style={{ textAlign: "center", maxWidth: "100%" }}>
    <iframe
      style={{ maxWidth: "100vw" }}
      width="560"
      height="315"
      src="https://www.youtube.com/embed/U8AB6ddB5_g"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <p style={{ fontSize: "1.5em" }}>
      $7/mo after 14 day free trial.{" "}
      <a href="/signup" native>
        Sign up today.
      </a>
    </p>
  </div>
);
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

class Welcome extends Component {
  state = {
    formCode: `<form method="post"
    action="https://formbucket.com/f/buk_ELB6nWrb08lTFqO0BLIU3ZM0">
<input type="email" name="email" placeholder="Your email" />
<input type="text" name="message" placeholder="Your message" />
<input type="submit"/>
<input type="reset" />
</form>`
  };
  render() {
    let { props, state } = this;
    let {
      histogram = "Histogram here: Submission count for last week by hour (7*24 hours)",
      statBucketCount = 0,
      statsTopBuckets = [{}], // last 3 buckets that received submission.
      statsTopSubmissions = 0, // last 3 buckets that received submission.
      statSubmissionCountToday = 0,
      statSubmissionCountMonth = 0,
      statSubmissionCountTotal = 0,
      webhooksSuceeded = 0,
      webhooksWaiting = 0,
      webhooksActive = 0,
      webhooksFailed = 0,
      webhooksDelayed = 0,
      notificationSuceeded = 0,
      notificationWaiting = 0,
      notificationActive = 0,
      notificationFailed = 0,
      notificationDelayed = 0
    } = props;
    if (false && props.user && !props.user.anonymous) {
      return (
        <div class="wrapper">
          <h1>Welcome, {props.user.name}</h1>
          <div class="histogram">{histogram}</div>
          <div class="card">
            <h2>Top</h2>
            <h3>Buckets</h3>
            <div class="stat">{statsTopBuckets}</div>
            <h3>Submissions</h3>
            <div class="stat">{statsTopSubmissions}</div>
          </div>
          <div class="card">
            <h2>Counts</h2>
            <h2>Buckets</h2>
            <div class="stat">{statBucketCount}</div>
            <h3>Submissions Today</h3>
            <div class="stat">{statSubmissionCountToday}</div>
            <h3>Submissions Month</h3>
            <div class="stat">{statSubmissionCountMonth}</div>
            <h3>Submissions Total</h3>
            <div class="stat">{statSubmissionCountTotal}</div>
          </div>
          <div class="card">
            <h2>Webhooks</h2>
            <h3>Suceeded</h3>
            <div class="stat">{webhooksSuceeded}</div>
            <h3>Waiting</h3>
            <div class="stat">{webhooksWaiting}</div>
            <h3>Active</h3>
            <div class="stat">{webhooksActive}</div>
            <h3>Failed</h3>
            <div class="stat">{webhooksFailed}</div>
            <h3>Delayed</h3>
            <div class="stat">{webhooksDelayed}</div>
          </div>
          <div class="card">
            <h2>Notifications</h2>
            <h3>Suceeded</h3>
            <div class="stat">{notificationSuceeded}</div>
            <h3>Waiting</h3>
            <div class="stat">{notificationWaiting}</div>
            <h3>Active</h3>
            <div class="stat">{notificationActive}</div>
            <h3>Failed</h3>
            <div class="stat">{notificationFailed}</div>
            <h3>Delayed</h3>
            <div class="stat">{notificationDelayed}</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div class="hero">
          <div class="bubbles">
            <div class="wrapper">
              <h1>Collecting forms online made simple!</h1>
              <h2>
                Our service makes capturing your custom forms easy. Simply copy
                your unique bucket URL into your HTML code. We'll collect the
                responses, send out notifications and more.
              </h2>
            </div>
            <Clincher />
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <div>
            <div class="wrapper">
              <div class="features">
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/bunny.svg")}
                      alt="Magic Buckets"
                    />
                  </div>
                  <div class="copy">
                    <h3>Form + Bucket</h3>
                    <p>
                      Your forms are saved to a bucket which is assigned a
                      unique URL. Setup is fast and easy, simply copy and paste
                      the URL into to your HTML code.
                    </p>
                  </div>
                </div>
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/heart.svg")}
                      alt="Your User Experience"
                    />
                  </div>
                  <div class="copy">
                    <h3>Your User Experience</h3>
                    <p>
                      Standard form submission redirect back to your website.
                      Our service is virtually invisible.
                    </p>
                  </div>
                </div>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="icon">
                    <img src={require("../img/bell.svg")} alt="Notifications" />
                  </div>
                  <div class="copy">
                    <h3>Notifications</h3>
                    <p>
                      Send customizable notifications when new submissions
                      arrive.
                    </p>
                  </div>
                </div>
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/autoresponder.svg")}
                      alt="Autoresponders"
                    />
                  </div>
                  <div class="copy">
                    <h3>Autoresponders</h3>
                    <p>
                      Automatically send personalized emails to people who
                      submit your form.
                    </p>
                  </div>
                </div>
              </div>

              <div class="features">
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/list.svg")}
                      alt="Submission Database"
                    />
                  </div>
                  <div class="copy">
                    <h3>Submission Database</h3>
                    <p>
                      Your form submissions are collected and stored in a
                      searchable database with export to CSV and JSON.
                    </p>
                  </div>
                </div>
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/robot.svg")}
                      alt="Endless Automation"
                    />
                  </div>
                  <div class="copy">
                    <h3>Webhook Automation</h3>
                    <p>
                      Sometimes you need to integrate with other systems.
                      Webhook events to other applications.
                    </p>
                  </div>
                </div>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/shield.svg")}
                      alt="Spam Protection"
                    />
                  </div>
                  <div class="copy">
                    <h3>Spam Protection</h3>
                    <p>
                      Spam is a reality. Our service employs techniques to
                      combat this problem.
                    </p>
                  </div>
                </div>

                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/laptop.svg")}
                      alt="Full Control"
                    />
                  </div>
                  <div class="copy">
                    <h3>No Embeds or iFrames</h3>
                    <p>
                      Develop forms with custom HTML and CSS. No overrides! No
                      scripts! Use regular HTML forms or{" "}
                      <a href="/openapi/ui" native>
                        use our API
                      </a>
                      !
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="louder">
              <div className="wrapper">
                <div className="">
                  <div className="editor">
                    <div className="left">
                      <Editor
                        value={this.state.formCode}
                        onValueChange={formCode => this.setState({ formCode })}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                          marginBottom: 20,
                          color: "#512da8"
                        }}
                      />
                    </div>
                    <div className="right">
                      <iframe
                        sandbox="allow-same-origin allow-forms allow-scripts"
                        style={{
                          border: "1px solid #EEE",
                          width: "100%",
                          minHeight: 287
                        }}
                        ref={ref => {
                          this.formFrame = ref;
                        }}
                        src={`data:text/html;base64,${btoa(
                          `<html><head><title>FormBucket Test Page</title><style>body { margin: 0; padding: 10; background: white; } input, button, textarea { display: block;margin-bottom: 20px; }</style></head><body>${
                            this.state.formCode
                          }</body></html>`
                        )}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div id="pricing" class="section-block">
              <div class="louder">
                <div class="wrapper">
                  <div class="clincher">
                    {IF(
                      props.user && !props.user.anonymous,
                      <div>
                        <a class="button" href="/buckets">
                          Return to buckets
                        </a>
                      </div>,
                      <div>
                        <h2>Simple Pricing</h2>
                        <p>
                          Unlimited Buckets and Submissions for just{" "}
                          <strong>$7/mo.</strong> Free for 14 days, no credit
                          card required and cancel anytime.
                        </p>
                        <button
                          type="button"
                          onClick={() => (window.location.href = "/signup")}
                        >
                          Sign Up
                        </button>
                        <p>Free 14-Day Trial • No credit card to sign up!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
