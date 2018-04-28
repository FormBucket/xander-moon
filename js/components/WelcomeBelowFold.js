/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";
import { IF } from "formula";
import { server } from "../stores/webutils";
import FontAwesome from "react-fontawesome";
import { router } from "hrx";

window.validateForm = function() {
  var v = true;
  var message = document.getElementsByName("message")[0].value;

  if (!message) {
    v = false;
    document.getElementsByName("message")[0].style.border = "1px red solid";
  } else {
    document.getElementsByName("message")[0].style.border = "";
  }

  return v;
};

var content = `
<h3>Hello, World!</h3>
<form method="post"
  action="${server}/f/homepage"
  onsubmit="return validateForm()">
  <label>Your Name</label>
  <input type="text" name="name" />
  <label>Your Email</label>
  <input type="text" name="email" />
  <label>What form will you make?</label>
  <textarea name="message"></textarea>
  <button class="secondary" type="submit">Submit</button>
</form>`;

class Welcome extends React.Component {
  state = {
    isAnnual: true,
    showVideo: false,
    ghostText: ""
  };

  componentDidMount() {
    var lines = content.split("\n");
    var currentLines = [];

    this.timerId = setInterval(() => {
      currentLines = currentLines.concat(lines[currentLines.length]);
      var html = currentLines.join("\n");

      this.setState({
        ghostMarkup: html,
        ghostText: "```html\n" + html + "\n```"
      });

      // handle case when lines total
      if (currentLines.length === lines.length) {
        clearInterval(this.timerId);

        this.setState({
          ghostText: this.state.ghostText + '\n<span class="blinking-cursor" />'
        });
      }
    }, 42);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  openVideo = () => {
    this.setState({ showVideo: true });
  };

  closeVideo = () => {
    this.setState({ showVideo: false });
  };

  render() {
    return (
      <div>
        <div>
          <div className="wrapper">
            <div className="features">
              <div className="editor">
                <div className="left">
                  <div className="typing">
                    <Markdown
                      source={this.state.ghostText}
                      options={markdownOptions}
                    />
                  </div>
                </div>
                <div
                  className="right"
                  dangerouslySetInnerHTML={{ __html: this.state.ghostMarkup }}
                />
              </div>
            </div>
          </div>
          <div id="features" className="section-block">
            <div className="wrapper">
              <div className="clincher">
                <h2>Quickly and Easily Setup Forms</h2>
                <p className="blurb">
                  Need a contact or lead form? Forget about setting up scripts,
                  databases or fighting with spammers. We handle all of these for you.
                </p>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/bunny.svg" alt="Magic Buckets" />
                </div>
                <div className="copy">
                  <h3>Magic Buckets</h3>
                  <p>
                    Our services saves form submissions to a "bucket". Think of
                    a it like a table in a database or a worksheet in a
                    spreadsheet. Each bucket has a unique URL which is simply
                    copied and pasted into your HTML. Setup is fast and easy.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/laptop.svg" alt="Full Control" />
                </div>
                <div className="copy">
                  <h3>No Embeds or iFrames</h3>
                  <p>
                    Build and style forms with your HTML and CSS. No overrides!
                    No scripts! Just your beautiful code!
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/heart.svg" alt="Your User Experience" />
                </div>
                <div className="copy">
                  <h3>Your User Experience</h3>
                  <p>
                    Standard form submission redirect back to your website or
                    use JSON Endpoints for advanced integration. Our service is
                    virtually invisible.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/autoresponder.svg" alt="Submissions Manager" />
                </div>
                <div className="copy">
                  <h3>Autoresponders</h3>
                  <p>
                    Automatically send personalized emails to people who submit
                    your form.
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/bell.svg" alt="Notifications" />
                </div>
                <div className="copy">
                  <h3>Notifications</h3>
                  <p>
                    Send customizable notifications when new submissions arrive.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/shield.svg" alt="Spam Protection" />
                </div>
                <div className="copy">
                  <h3>Spam Protection</h3>
                  <p>
                    Spammers are the worst. Our service employs advanced
                    techniques to block and filter spam.
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/list.svg" alt="Submission Database" />
                </div>
                <div className="copy">
                  <h3>Submission Database</h3>
                  <p>
                    Form submissions stored in a searchable database with export
                    to CSV and JSON.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/robot.svg" alt="Endless Automation" />
                </div>
                <div className="copy">
                  <h3>Webhook Automation</h3>
                  <p>
                    Capturing submissions is great but sometimes you want to
                    integrate with other systems. Forward forms to other
                    applications with easy to setup webhooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="pricing" className="section-block">
            <div className="louder">
              <div className="wrapper">
                <div className="clincher">
                  {IF(
                    this.props.user && this.props.user.account_id,
                    <div>
                      <button
                        type="button"
                        onClick={() => router.open("/buckets")}
                      >
                        Return to buckets
                      </button>
                    </div>,
                    <div>
                      <h2>Simple Pricing</h2>
                      <p>
                        Unlimited Buckets and Submissions for just{" "}
                        <strong>$7/mo.</strong> Free for 14 days, no credit card
                        required and cancel anytime.
                      </p>
                      <button
                        type="button"
                        onClick={() => router.open("/signup")}
                      >
                        Sign Up
                      </button>
                      <p>Free 14-Day Trial • No credit card to sign up!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
