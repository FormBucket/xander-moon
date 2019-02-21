/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import FontAwesome from "react-fontawesome";
import IF from "formula/src/branch";
import ISARRAY from "formula/src/isarray";
import ISEMPTY from "formula/src/isempty";
import hljs from "highlight.js/lib/highlight.js";
import xml from "highlight.js/lib/languages/xml.js";
import "highlight.js/styles/github.css";
import "./styles/bucket.scss";
import { route } from "preact-router";

hljs.registerLanguage("xml", xml);

function setupRecaptcha(recaptcha_on) {
  if (!recaptcha_on) return;

  if (grecaptcha) {
    grecaptcha.render("g-recaptcha-container", {
      sitekey: "6LcC9kwUAAAAAKZkAPmBWJeHh13qX4R5jCLlENBT"
    });

    document.getElementById("my-awesome-form").onsubmit = () => {
      if (recaptcha_on) {
        if (grecaptcha.getResponse() == "") {
          alert("Invalid recaptcha");
          grecaptcha.reset();
          return false;
        }
      }
      return true;
    };
  }
}

function makeHTMLForm(
  { id, honey_pot_on, honey_pot_field, recaptcha_on },
  isPreview = false
) {
  setTimeout(() => {
    hljs.highlightBlock(document.getElementById("form-code-example"));
  }, 16);

  return `${
    recaptcha_on && isPreview
      ? `<script src="https://www.google.com/recaptcha/api.js"></script>
`
      : ""
  }<form id="my-awesome-form" action="${"https://" +
    window.location.host}/f/${id}" method="post" target="_blank">
  <input type="text" name="email" placeholder="email" />
  <input type="text" name="subject" placeholder="subject" />
  <textarea type="text" name="message" placeholder="message"></textarea>${
    honey_pot_on
      ? `
  <label style="display:none">Honey pot (Should be hidden and empty)</label>
  <input type="text" name="${
    ISEMPTY(honey_pot_field) ? "__bucket_trap__" : honey_pot_field
  }" style="display: none" />`
      : ""
  }${
    recaptcha_on
      ? `
  <div id="g-recaptcha-container" class="g-recaptcha" data-sitekey="{put-your-site-key-here}"></div>`
      : ``
  }
  <input class="button secondary" type="submit" value="Submit" />
  <input class="button secondary" type="reset" value="Reset" />
</form>`;
}

class Bucket extends Component {
  state = {
    showEditor: false
  };

  componentWillUnmount() {
    this.props.resetBucket();
  }

  componentDidUpdate() {
    setTimeout(() => setupRecaptcha(this.props.savedBucket.recaptcha_on), 250);
  }

  componentWillUnmount() {
    if (this.props.saveBucket.recaptcha_on) grecaptcha.reset();
  }

  toggleAutoResponder = e => {
    changeBucket({ auto_responder: false });

    if (e.target.checked) {
      changeBucket({
        auto_responder: {
          from: this.refs.auto_responder_from.value,
          subject: this.refs.auto_responder_subject.value,
          body: this.refs.auto_responder_body.value
        }
      });
    }
  };

  onChangeAutoResponderMessage = value => {
    if (!value) return;

    changeBucket({
      auto_responder_content: value,
      auto_responder: Object.assign({}, bucket.auto_responder, {
        body: value.toString("markdown")
      })
    });
  };

  render() {
    let { props } = this;
    let {
      user,
      buckets,
      submissions,
      error,
      unsavedBucket,
      savedBucket,
      changeBucket,
      exportBucket,
      deleteBucket
    } = props;
    let bucket = unsavedBucket;

    if (!bucket) return null;

    let download = () => exportBucket(savedBucket);
    let downloadCSV = () => exportBucket(savedBucket, "csv");
    if (!bucket) return null;

    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>
              {bucket.name && bucket.name.length > 0 ? bucket.name : bucket.id}
            </h1>
          </div>
        </div>
        <div class="wrapper">
          <div class="bucket-details">
            <div class="section">
              <div>{error}</div>
              <h3>Name</h3>
              <input
                type="text"
                id="bucketName"
                placeholder="e.g. Beta Signups"
                autoFocus={focus}
                onChange={e => changeBucket({ name: e.target.value })}
                defaultValue={bucket.name}
              />
              <label htmlFor="bucketEnabled" class="label-switch">
                {" "}
                Accept Submissions?
                <input
                  id="bucketEnabled"
                  type="checkbox"
                  onClick={event =>
                    changeBucket({ enabled: event.target.checked })
                  }
                  checked={bucket.enabled}
                />
                <div class="checkbox" />
              </label>
            </div>
            <div class="section">
              <h3>Custom Redirect</h3>
              <input
                type="text"
                placeholder="Send to custom landing page, supports merge tags"
                id="redirectURL"
                onChange={e => changeBucket({ redirect_url: e.target.value })}
                disabled={bucket.is_api_request}
                defaultValue={bucket.redirect_url}
              />
              <label htmlFor="bucketAJAXOnly" class="label-switch">
                {" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="/guides/json-endpoints"
                >
                  JSON Endpoint?
                </a>
                <input
                  id="bucketAJAXOnly"
                  type="checkbox"
                  onChange={event =>
                    changeBucket({ is_api_request: event.target.checked })
                  }
                  checked={bucket.is_api_request}
                />
                <div class="checkbox" />
              </label>
            </div>
            <div class="section">
              <h3>Notifications</h3>
              <label>
                <input
                  type="radio"
                  onChange={() => changeBucket({ email_to: false })}
                  checked={bucket.email_to === false}
                />
                Do not send notifications
              </label>
              <label>
                <input
                  type="radio"
                  onClick={() => changeBucket({ email_to: true })}
                  checked={bucket.email_to === true}
                />
                Send notifications to {user.email}
              </label>
              <label>
                <input
                  type="radio"
                  onClick={() =>
                    changeBucket({
                      email_to: "" + this.refs.additionalEmails.value
                    })
                  }
                  checked={typeof bucket.email_to === "string"}
                />
                Send notifications to:
                <textarea
                  disabled={typeof bucket.email_to === "string" ? false : true}
                  class="cc-emails"
                  placeholder="Separate addresses by comma"
                  onChange={e => changeBucket({ email_to: e.target.value })}
                  defaultValue={
                    typeof bucket.email_to === "string" ? bucket.email_to : ""
                  }
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  name="enableAdvancedNotificationSettings"
                  onChange={() =>
                    changeBucket({
                      advanced_notification_on: !bucket.advanced_notification_on
                    })
                  }
                  checked={bucket.advanced_notification_on}
                />
                Advanced Settings (optional)
              </label>
              <div
                class="autoresponder-wrapper"
                style={{
                  display: bucket.advanced_notification_on ? "" : "none"
                }}
              >
                <label htmlFor="notificationFrom">Sent From:</label>
                <input
                  name="notificationFrom"
                  type="text"
                  placeholder="Defaults to support@formbucket.com"
                  onChange={e =>
                    changeBucket({ notification_from: e.target.value })
                  }
                  defaultValue={bucket.notification_from}
                />
                <label htmlFor="notificationReplyTo">Reply to:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="Defaults to {{ email }} or {{ _replyto }}, otherwise your email"
                  onChange={e =>
                    changeBucket({ notification_reply_to: e.target.value })
                  }
                  defaultValue={bucket.notification_reply_to}
                />
                <label htmlFor="notificationReplyTo">CC:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="Defaults to {{ _cc }}, otherwise blank"
                  onChange={e => changeBucket({ email_cc: e.target.value })}
                  defaultValue={bucket.email_cc}
                />
                <label htmlFor="notificationReplyTo">BCC:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="Defaults to {{ _bcc }}, otherwise blank"
                  onChange={e => changeBucket({ email_bcc: e.target.value })}
                  defaultValue={bucket.email_bcc}
                />
                <label htmlFor="notificationSubject" htmlFor="subject">
                  Subject
                </label>
                <input
                  name="notificationSubject"
                  type="text"
                  placeholder='Defaults to {{ _subject }}, otherwise "Submission for {{bucket_name}}"'
                  onChange={e =>
                    changeBucket({ notification_subject: e.target.value })
                  }
                  defaultValue={bucket.notification_subject}
                />
                <label htmlFor="notificationTemplate">
                  Body (supports Markdown)
                </label>
                <textarea
                  name="notificationTemplate"
                  placeholder="Send default notification"
                  onChange={e =>
                    changeBucket({ notification_template: e.target.value })
                  }
                  defaultValue={bucket.notification_template}
                />
                <div>
                  <a href="/guides/merge-tags" target="_blank">
                    Learn about merge tags
                  </a>
                </div>
                <div>
                  <a
                    href="https://daringfireball.net/projects/markdown/  "
                    target="_blank"
                  >
                    Learn about Markdown
                  </a>
                </div>
                {/*}<RichTextEditor
                  value={bucket.auto_responder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div class="section">
              <h3>Autoresponder</h3>
              <label>
                <input
                  type="checkbox"
                  class="checkbox autoresponder"
                  name="sendAutoresponder"
                  onChange={this.toggleAutoResponder}
                  checked={bucket.auto_responder}
                />
                Automatically send an email to form submitters
              </label>
              <div
                class="autoresponder-wrapper"
                style={{ display: bucket.auto_responder ? "" : "none" }}
              >
                <p>
                  <FontAwesome name="exclamation-circle" /> Note: Your form must
                  have an <strong>email address</strong> field to use this
                  feature.
                </p>
                <label htmlFor="fromEmail">From</label>
                <input
                  type="text"
                  onChange={e =>
                    changeBucket({
                      auto_responder: Object.assign({}, bucket.auto_responder, {
                        from: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.auto_responder
                      ? bucket.auto_responder.from
                      : user.email
                  }
                />
                <label htmlFor="toEmail">To</label>
                <input
                  type="text"
                  placeholder="Defaults to {{ email }}"
                  onChange={e =>
                    changeBucket({
                      auto_responder: Object.assign({}, bucket.auto_responder, {
                        to: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.auto_responder ? bucket.auto_responder.to : null
                  }
                />
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  placeholder="Thanks!"
                  onChange={e =>
                    changeBucket({
                      auto_responder: Object.assign({}, bucket.auto_responder, {
                        subject: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.auto_responder ? bucket.auto_responder.subject : ""
                  }
                />
                <label htmlFor="emailBody">Body (supports Markdown)</label>
                <textarea
                  onChange={e =>
                    changeBucket({
                      auto_responder: Object.assign({}, bucket.auto_responder, {
                        body: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.auto_responder ? bucket.auto_responder.body : ""
                  }
                />
                <div>
                  <a href="/guides/merge-tags" target="_blank">
                    Learn about merge tags
                  </a>
                </div>
                <div>
                  <a
                    href="https://daringfireball.net/projects/markdown/  "
                    target="_blank"
                  >
                    Learn about Markdown
                  </a>
                </div>
                {/*}<RichTextEditor
                  value={bucket.auto_responder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div class="section">
              <h3>Webhooks</h3>
              {ISARRAY(bucket.webhooks)
                ? bucket.webhooks.map((webhook, i) => (
                    <div key={i}>
                      <a
                        style={{
                          position: "relative",
                          float: "right",
                          right: "-30px",
                          top: "42px",
                          paddingTop: 5,
                          paddingBottom: 5,
                          paddingRight: 7,
                          paddingLeft: 7,
                          marginTop: -40,
                          color: "red",
                          backgroundColor: "white",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          var updated = bucket.webhooks.filter(
                            (v, k) => i !== k
                          );
                          changeBucket({ webhooks: updated });
                        }}
                      >
                        <FontAwesome name="minus" />
                      </a>
                      <input
                        type="text"
                        id={"webhook" + i}
                        onChange={e => {
                          var updated = bucket.webhooks.map((v, k) =>
                            i === k ? e.target.value : v
                          );
                          changeBucket({ webhooks: updated });
                        }}
                        defaultValue={webhook}
                      />
                    </div>
                  ))
                : ""}
              <div>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    changeBucket({
                      webhooks: bucket.webhooks
                        ? bucket.webhooks.concat([""])
                        : [""]
                    })
                  }
                >
                  <FontAwesome name="plus" /> Add webhook
                </a>
              </div>
            </div>
            <div class="section">
              <h3>Spam and Bot Protection</h3>

              <label htmlFor="honeyPotEnabled" class="label-switch">
                Honey Pot
                <input
                  id="honeyPotEnabled"
                  type="checkbox"
                  onClick={event =>
                    changeBucket({ honey_pot_on: event.target.checked })
                  }
                  checked={bucket.honey_pot_on}
                />
                <div class="checkbox" />
              </label>
              <br />
              <br />
              {IF(
                bucket.honey_pot_on,

                <div>
                  <label>
                    Honey pot field{" "}
                    <a class="pull-right" href="/guides/honeypot">
                      Honey pot?
                    </a>
                    <input
                      placeholder="Optional custom fieldname"
                      onChange={e =>
                        changeBucket({ honey_pot_field: e.target.value })
                      }
                      defaultValue={bucket.honey_pot_field}
                    />
                  </label>
                </div>
              )}

              <label htmlFor="recaptchaEnabled" class="label-switch">
                {" "}
                Recaptcha
                <input
                  id="recaptchaEnabled"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({ recaptcha_on: event.target.checked });
                  }}
                  checked={bucket.recaptcha_on}
                />
                <div class="checkbox" />
              </label>
              {IF(
                bucket.recaptcha_on,
                <div class="spam-protection">
                  <label>
                    Secret key (provided by Google)
                    <input
                      onChange={e =>
                        changeBucket({ recaptcha_secret: e.target.value })
                      }
                      defaultValue={bucket.recaptcha_secret}
                    />
                  </label>
                  <label>
                    <script src="https://www.google.com/recaptcha/api.js" />
                  </label>
                </div>
              )}
            </div>
            <input
              type="button"
              class="button"
              onClick={() => {
                this.props.saveBucket();
                setupRecaptcha(this.props.unsavedBucket.recaptcha_on);
              }}
              value="Save Settings"
            />
          </div>
          <div class="bucket-preview">
            View:&nbsp;
            <a
              href={`/buckets/${
                bucket.id
              }/submissions/list/0/50/data,created_on`}
            >
              Submissions
            </a>
            &nbsp;{" "}
            <a href={`/logs?offset=0&limit=10&bucket_id=${bucket.id}`}>Logs</a>
            &nbsp;{" "}
            <a href={`/notifications?offset=0&limit=10&bucket_id=${bucket.id}`}>
              Notifications
            </a> 
          </div>
          <div class="bucket-preview">
            <div class="bucket-editor">
              <h4>Endpoint:</h4>
              <div>
                <input
                  type="text"
                  value={"https://" + window.location.host + "/f/" + bucket.id}
                />
              </div>
              <div style={{ display: this.state.showEditor ? "" : "none" }}>
                <hr />
                <h4>Example HTML</h4>
                <p>
                  Copy and paste the markup below into your project, replacing
                  the example inputs with your own.
                </p>
                <div class="quick-use" style={{ textAlign: "left" }}>
                  <pre class="hightlight-js">
                    <code id="form-code-example" class="html">
                      {makeHTMLForm(savedBucket, true)}
                    </code>
                  </pre>
                </div>
              </div>
              <hr />

              <h4>
                Test Form
                <a
                  href="javascript:void(0)"
                  style={{ float: "right" }}
                  onClick={() => {
                    setTimeout(() => {
                      this.setState({ showEditor: !this.state.showEditor });
                      return false;
                    }, 200);
                    return false;
                  }}
                >
                  {IF(this.state.showEditor, "Hide", "Show")} Example HTML
                </a>
              </h4>
              <div>
                <form
                  id="my-awesome-form"
                  action={`${"https://" + window.location.host}/f/${bucket.id}`}
                  method="post"
                  target="_blank"
                >
                  <input type="text" name="email" placeholder="email" />
                  <input type="text" name="subject" placeholder="subject" />
                  <textarea type="text" name="message" placeholder="message" />
                  {bucket.honey_pot_on ? (
                    <div>
                      <label style="display:none">
                        Honey pot (Should be hidden and empty)
                      </label>
                      <input
                        type="text"
                        name={
                          ISEMPTY(bucket.honey_pot_field)
                            ? "__bucket_trap__"
                            : bucket.honey_pot_field
                        }
                        style="display: none"
                      />
                    </div>
                  ) : null}
                  {savedBucket.recaptcha_on ? (
                    <div id="g-recaptcha-container" />
                  ) : null}
                  <input
                    class="button secondary"
                    type="submit"
                    value="Submit"
                  />
                  <input class="button secondary" type="reset" value="Reset" />
                </form>
              </div>
            </div>
          </div>
          <div class="bucket-preview">
            <p>
              <a href="javascript:void(0)" onClick={downloadCSV}>
                Export submissions to CSV
              </a>
            </p>
            <p>
              <a href="javascript:void(0)" onClick={download}>
                Export submissions to JSON
              </a>
            </p>
            <p>
              <a
                class="danger"
                href="javascript:void(0)"
                onClick={deleteBucket}
              >
                Delete this Bucket
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Bucket;
