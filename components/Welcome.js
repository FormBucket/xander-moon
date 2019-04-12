/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
// import Contact from "./Contact";
import "./styles/welcome.scss";

const Clincher = () => <div id="features" class="section-block" />;

class Welcome extends Component {
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
              <h1>Cloud Form Backend</h1>
              <h2>
                Welcome to <strong>easy, fast and secure</strong> hosted form
                collection service.
              </h2>
              {IF(
                props.user && !props.user.anonymous,
                null,
                <div>
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Join Free
                  </button>
                  <p>Start collecting forms in seconds.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <Clincher />
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
              <div class="features">
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
                <div class="feature">
                  <div class="icon">
                    <img
                      src={require("../img/autoresponder.svg")}
                      alt="Submissions Manager"
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
            </div>
            {/* <div class="louder">
              <div class="wrapper">
                <Contact />
              </div>
            </div> */}
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
