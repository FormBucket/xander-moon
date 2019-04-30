/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import ISARRAY from "formula/src/isarray";
import isEmpty from "formula/src/isempty";
import isblank from "formula/src/isblank";
import isTruthy from "formula/src/istruthy";
import "./styles/bucket.scss";
import { route } from "preact-router";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

import { server } from "../src/webutils";

// function setupRecaptcha(recaptchaOn) {
//   if (true || !recaptchaOn) return;

//   if (grecaptcha) {
//     grecaptcha.render("g-recaptcha-container", {
//       sitekey: "6LcC9kwUAAAAAKZkAPmBWJeHh13qX4R5jCLlENBT"
//     });

//     document.getElementById("my-awesome-form").onsubmit = () => {
//       if (recaptchaOn) {
//         if (grecaptcha.getResponse() == "") {
//           alert("Invalid recaptcha");
//           grecaptcha.reset();
//           return false;
//         }
//       }
//       return true;
//     };
//   }
// }

function makeHTMLForm(
  { id, honeyPotOn, honeyPotField, recaptchaOn },
  isPreview = false
) {
  // setTimeout(() => {
  //   hljs.highlightBlock(document.getElementById("form-code-example"));
  // }, 16);

  return `<form method="post"
action="${server}/f/${id}">
<input type="email" name="email"/>
<input type="submit"/>
<input type="reset" />
</form>`;

  return `${
    false && recaptchaOn && isPreview
      ? `<script src="https://www.google.com/recaptcha/api.js"></script>
`
      : ""
  }<form method="post"
action="${server}/f/${id}">
  <input type="email" name="email"/>${
    false && honeyPotOn
      ? `
  <label style="display:none"></label>
  <input type="hidden" 
    name="${isEmpty(honeyPotField) ? "__bucket_trap__" : honeyPotField}" 
    style="display: none" />`
      : ""
  }${
    false && recaptchaOn
      ? `
  <div id="g-recaptcha-container" 
    class="g-recaptcha" 
    data-sitekey="{put-your-site-key-here}"></div>`
      : ``
  }
  <input type="submit" value="Submit" />
  <input type="reset" value="Reset" />
</form>`;
}

class Bucket extends Component {
  state = {
    showEditor: true
  };

  componentWillUnmount() {
    this.props.resetBucket();
  }

  componentDidMount() {
    let { savedBucket = {} } = this.props;

    // setTimeout(() => setupRecaptcha(savedBucket.recaptchaOn), 250);
  }

  componentWillUnmount() {
    // if (this.props.saveBucket.recaptchaOn) grecaptcha.reset();
  }

  toggleAutoResponder = e => {
    let { changeBucket } = this.props;
    changeBucket({ autoResponder: false });

    if (e.target.checked) {
      changeBucket({
        autoResponder: {
          on: true,
          from: this.refs.autoResponder_from.value,
          subject: this.refs.autoResponder_subject.value,
          body: this.refs.autoResponder_body.value
        }
      });
    }
  };

  onChangeAutoResponderMessage = value => {
    if (!value) return;
    let { changeBucket } = this.props;

    changeBucket({
      autoResponder_content: value,
      autoResponder: Object.assign({}, bucket.autoResponder, {
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
    let bucket = { ...savedBucket, ...unsavedBucket };

    if (!bucket) return null;

    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    let download = () => exportBucket(savedBucket);
    let downloadCSV = () => exportBucket(savedBucket, "csv");
    if (!bucket) return null;
    this.refs = this.refs || {};

    bucket.quickUseFormCode =
      bucket.quickUseFormCode || makeHTMLForm(bucket, true);
    return (
      <div class="bucket-page">
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
              <div>
                <h3>Name</h3>
                <input
                  type="text"
                  id="bucketName"
                  placeholder="e.g. Beta Signups"
                  autoFocus={focus}
                  onKeyUp={e => changeBucket({ name: e.target.value })}
                  defaultValue={bucket.name}
                />
                <label htmlFor="bucketEnabled" class="label-switch">
                  {" "}
                  Status
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
            </div>
            <div class="section">
              <h3>Actions</h3>
              <label for="redirectURL">
                Redirect URL
                <input
                  type="text"
                  placeholder={
                    bucket.isAPIRequest
                      ? "Redirects are disabled when JSON Only is enabled."
                      : "{{ _next }}"
                  }
                  id="redirectURL"
                  onChange={e => changeBucket({ redirectUrl: e.target.value })}
                  disabled={bucket.isAPIRequest}
                  defaultValue={bucket.redirectUrl}
                />
              </label>

              {ISARRAY(bucket.webhooks) && bucket.webhooks.length > 0 ? (
                <label>Webhooks</label>
              ) : null}
              {ISARRAY(bucket.webhooks)
                ? bucket.webhooks.map((webhook, i) => (
                    <div key={i} style={{ width: "95%" }}>
                      {/* <a
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
                          changeBucket({});
                        }}
                      >
                        <i
                          style={{ color: "black", paddingRight: 20 }}
                          class="fa fa-gear"
                        />
                      </a> */}
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
                        <i class="fa fa-minus" />
                      </a>
                      <input
                        type="text"
                        id={"webhook" + i}
                        style={{ width: "95%" }}
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
                  <i class="fa fa-plus" /> Add webhook
                </a>
              </div>
              <label>
                <input
                  type="checkbox"
                  class="checkbox autoresponder"
                  name="sendAutoresponder"
                  onChange={this.toggleAutoResponder}
                  checked={
                    bucket.autoResponder && bucket.autoResponder.on == true
                  }
                />
                Automatically send email to bucket submitter.
              </label>
              <div
                class="autoresponder-wrapper"
                style={{
                  display:
                    bucket.autoResponder && bucket.autoResponder.on
                      ? ""
                      : "none"
                }}
              >
                <p>
                  <i class="fa fa-exclamation-circle" /> Note: Your form must
                  have an <strong>email address</strong> field to use this
                  feature.
                </p>
                <label htmlFor="fromEmail">From</label>
                <input
                  type="text"
                  ref={e => (this.refs.autoResponder_from = e)}
                  placeholder="support@formbucket.com"
                  onChange={e =>
                    changeBucket({
                      autoResponder: Object.assign({}, bucket.autoResponder, {
                        from: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.autoResponder
                      ? bucket.autoResponder.from
                      : user.email
                  }
                />
                <label htmlFor="toEmail">To</label>
                <input
                  type="text"
                  ref={e => (this.refs.autoResponder_to = e)}
                  placeholder="{{ email }}"
                  onChange={e =>
                    changeBucket({
                      autoResponder: Object.assign({}, bucket.autoResponder, {
                        to: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.autoResponder ? bucket.autoResponder.to : null
                  }
                />
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  ref={e => (this.refs.autoResponder_subject = e)}
                  placeholder="Thanks!"
                  onChange={e =>
                    changeBucket({
                      autoResponder: Object.assign({}, bucket.autoResponder, {
                        subject: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.autoResponder ? bucket.autoResponder.subject : ""
                  }
                />
                <label>
                  Body{" "}
                  {/* <span style={{ float: "right" }}>
                    <label style={{ display: "inline-block" }}>
                      <input name="autoResponderEngine" type="radio" />
                      HTML
                    </label>
                    {"  "}
                    <label style={{ display: "inline-block" }}>
                      <input name="autoResponderEngine" type="radio" />
                      Markdown
                    </label>
                    {"  "}
                    <label style={{ display: "inline-block" }}>
                      <input name="autoResponderEngine" type="radio" />
                      MJML
                    </label>
                  </span> */}
                </label>
                <textarea
                  ref={e => (this.refs.autoResponder_body = e)}
                  placeholder="Supports HTML, CSS, markdown and templates with {{handlebars}}."
                  onChange={e =>
                    changeBucket({
                      autoResponder: Object.assign({}, bucket.autoResponder, {
                        body: e.target.value
                      })
                    })
                  }
                  defaultValue={
                    bucket.autoResponder ? bucket.autoResponder.body : ""
                  }
                />

                {/*}<RichTextEditor
                  value={bucket.autoResponder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div class="section">
              <h3>Notifications</h3>
              <label>
                <input
                  type="radio"
                  onChange={() => changeBucket({ emailTo: false })}
                  checked={bucket.emailTo === false || isblank(bucket.emailTo)}
                />
                Do not send notifications
              </label>
              <label>
                <input
                  type="radio"
                  onClick={() => changeBucket({ emailTo: true })}
                  checked={bucket.emailTo === true}
                />
                Send notifications to {user.email}
              </label>
              <label>
                <input
                  type="radio"
                  onClick={() => {
                    changeBucket({
                      emailTo: "" + this.refs.additionalEmails.value
                    });
                    setTimeout(() => this.refs.additionalEmails.focus(), 0);
                  }}
                  checked={typeof bucket.emailTo === "string"}
                />
                Send notifications to:
                <textarea
                  disabled={typeof bucket.emailTo === "string" ? false : true}
                  class="cc-emails"
                  ref={e => (this.refs.additionalEmails = e)}
                  placeholder="Separate addresses by comma"
                  onChange={e => changeBucket({ emailTo: e.target.value })}
                  defaultValue={
                    typeof bucket.emailTo === "string" ? bucket.emailTo : ""
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
                      advancedNotificationOn: !bucket.advancedNotificationOn
                    })
                  }
                  checked={bucket.advancedNotificationOn}
                />
                Advanced Settings
              </label>
              <div
                class="autoresponder-wrapper"
                style={{
                  display: bucket.advancedNotificationOn ? "" : "none"
                }}
              >
                <label htmlFor="notificationReplyTo">Reply to:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="{{ email }}"
                  onChange={e =>
                    changeBucket({ notificationReplyTo: e.target.value })
                  }
                  defaultValue={bucket.notificationReplyTo}
                />
                <label htmlFor="notificationFrom">Sent From:</label>
                <input
                  name="notificationFrom"
                  type="text"
                  placeholder="Recommended to leave blank."
                  onChange={e =>
                    changeBucket({ notificationFrom: e.target.value })
                  }
                  defaultValue={bucket.notificationFrom}
                />
                <label htmlFor="notificationReplyTo">CC:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="{{ _cc }}"
                  onChange={e => changeBucket({ email_cc: e.target.value })}
                  defaultValue={bucket.email_cc}
                />
                <label htmlFor="notificationReplyTo">BCC:</label>
                <input
                  name="notificationReplyTo"
                  type="text"
                  placeholder="{{ _bcc }}"
                  onChange={e => changeBucket({ email_bcc: e.target.value })}
                  defaultValue={bucket.email_bcc}
                />
                <label htmlFor="notificationSubject" htmlFor="subject">
                  Subject
                </label>
                <input
                  name="notificationSubject"
                  type="text"
                  placeholder="{{ _subject }}"
                  onChange={e =>
                    changeBucket({ notificationSubject: e.target.value })
                  }
                  defaultValue={bucket.notificationSubject}
                />
                <label htmlFor="notificationTemplate">Body</label>
                <textarea
                  name="notificationTemplate"
                  placeholder="Supports HTML, CSS, markdown and templates with {{handlebars}}."
                  onChange={e =>
                    changeBucket({ notification_template: e.target.value })
                  }
                  defaultValue={bucket.notification_template}
                />
                {/* <div>
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
                </div> */}
                {/*}<RichTextEditor
                  value={bucket.autoResponder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>

              {/* <div>
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
              </div> */}
            </div>
            <div class="section">
              <h3>Security Checks</h3>
              <label htmlFor="spamCheckEnabled" class="label-switch">
                Spam Filter
                <input
                  id="spamCheckEnabled"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({ spamCheckOn: event.target.checked });
                  }}
                  checked={bucket.spamCheckOn}
                />
                <div class="checkbox" />
              </label>
              <label htmlFor="autoRecaptchaEnabled" class="label-switch">
                {" "}
                <span
                  style={{
                    textDecoration: bucket.isAPIRequest ? "line-through" : ""
                  }}
                >
                  Automatic Recaptcha (On formbucket.com)
                </span>
                <input
                  id="autoRecaptchaEnabled"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({
                      autoRecaptchaOn: event.target.checked,
                      recaptchaOn: false
                    });
                  }}
                  disabled={bucket.isAPIRequest}
                  checked={bucket.autoRecaptchaOn}
                />
                <div class="checkbox" />
              </label>

              <label htmlFor="recaptchaEnabled" class="label-switch">
                {" "}
                Custom Recaptcha (On your site)
                <input
                  id="recaptchaEnabled"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({
                      recaptchaOn: event.target.checked,
                      autoRecaptchaOn: false
                    });
                    setTimeout(() => this.recaptchaInput.focus(), 20);
                  }}
                  checked={bucket.recaptchaOn}
                />
                <div class="checkbox" />
              </label>
              {IF(
                bucket.recaptchaOn,
                <div class="spam-protection">
                  <label>
                    Secret key (provided by Google)
                    <input
                      onChange={e =>
                        changeBucket({ recaptchaSecret: e.target.value })
                      }
                      ref={e => (this.recaptchaInput = e)}
                      defaultValue={bucket.recaptchaSecret}
                    />
                  </label>
                  <label>
                    <script src="https://www.google.com/recaptcha/api.js" />
                  </label>
                </div>
              )}

              <label htmlFor="honeyPotEnabled" class="label-switch">
                Honey Pot (Non-visible field that must be blank)
                <input
                  id="honeyPotEnabled"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({ honeyPotOn: event.target.checked });
                    setTimeout(() => {
                      this.honeyPotInput && this.honeyPotInput.focus();
                    }, 0);
                  }}
                  checked={bucket.honeyPotOn}
                />
                <div class="checkbox" />
              </label>
              {IF(
                bucket.honeyPotOn,
                <label>
                  Honey pot field{" "}
                  <a class="pull-right" href="/guides/honeypot">
                    Honey pot?
                  </a>
                  <input
                    ref={ref => {
                      this.honeyPotInput = ref;
                    }}
                    placeholder="Optional custom fieldname"
                    onChange={e =>
                      changeBucket({ honeyPotField: e.target.value })
                    }
                    defaultValue={bucket.honeyPotField}
                  />
                </label>
              )}
              <label htmlFor="validateCodeOn" class="label-switch">
                {" "}
                Validation Code
                <input
                  id="validateCodeOn"
                  type="checkbox"
                  onClick={event => {
                    changeBucket({ validateCodeOn: event.target.checked });
                    setTimeout(
                      () => this.validateCodeEditor.firstChild.focus(),
                      20
                    );
                  }}
                  checked={bucket.validateCodeOn}
                />
                <div class="checkbox" />
              </label>
              <Editor
                value={
                  bucket.validateCode ||
                  "function isValid(form) { return true; }"
                }
                onValueChange={validateCode => changeBucket({ validateCode })}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                ref={ref => (this.validateCodeEditor = ref ? ref.base : ref)}
                style={{
                  display: bucket.validateCodeOn ? "" : "none",
                  marginBottom: 20
                }}
              />
              <label htmlFor="bucketAJAXOnly" class="label-switch">
                {" "}
                JSON Only? (Respond always with JSON instead of HTTP 302
                redirect.)
                <input
                  id="bucketAJAXOnly"
                  type="checkbox"
                  onChange={event =>
                    changeBucket({
                      isAPIRequest: event.target.checked,
                      autoRecaptchaOn: false
                    })
                  }
                  checked={bucket.isAPIRequest}
                />
                <div class="checkbox" />
              </label>
            </div>

            <input
              type="button"
              class="button button-save"
              onClick={() => {
                this.props.saveBucket();
              }}
              value="Save Settings"
            />
          </div>
          <div class="bucket-preview">
            <div class="bucket-editor">
              <p>
                <strong>Quick use</strong>
              </p>
              <div
                style={{
                  display: this.state.showEditor ? "" : "none",
                  fontSize: "smaller"
                }}
              >
                <p>
                  Copy and paste the markup below into your project, replacing
                  this example with your own code.
                </p>
                <div class="quick-use" style={{ textAlign: "left" }}>
                  <Editor
                    value={bucket.quickUseFormCode}
                    onValueChange={quickUseFormCode => {
                      changeBucket({ quickUseFormCode });
                      // var doc = this.formFrame.contentWindow.document;
                      // doc.open();
                      // doc.write(
                      //   "<html><head><title></title><style>input { display: block;margin-bottom: 20px; }</style></head><body>" +
                      //     quickUseFormCode +
                      //     "</body></html>"
                      // );
                      // doc.close();
                    }}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      overflowWrap: "normal"
                    }}
                  />
                </div>
                <p style={{ marginTop: 5 }}>
                  Your bucket's id is <strong>{bucket.id}</strong>.
                </p>
              </div>
              <div style={{ display: !this.state.showEditor ? "" : "none" }}>
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
                    {IF(this.state.showEditor, "Hide", "Show")} HTML
                  </a>
                </h4>
                <div>
                  <form
                    id="my-awesome-form"
                    action={`${window.location.host}/f/${bucket.id}`}
                    method="post"
                    target="_blank"
                  >
                    <input type="text" name="email" placeholder="email" />
                    <input type="text" name="subject" placeholder="subject" />
                    <textarea
                      type="text"
                      name="message"
                      placeholder="message"
                    />
                    {bucket.honeyPotOn ? (
                      <div>
                        <label style="display:none">
                          Honey pot (Should be hidden and empty)
                        </label>
                        <input
                          type="text"
                          name={
                            isEmpty(bucket.honeyPotField)
                              ? "__bucket_trap__"
                              : bucket.honeyPotField
                          }
                          style="display: none"
                        />
                      </div>
                    ) : null}
                    {savedBucket && savedBucket.recaptchaOn ? (
                      <div id="g-recaptcha-container" />
                    ) : null}
                    <input
                      class="button secondary"
                      type="submit"
                      value="Submit"
                    />
                    <input
                      class="button button-reset secondary"
                      type="reset"
                      value="Reset"
                    />
                  </form>
                </div>
              </div>
            </div>
            <p>
              <a
                href={`#`}
                onClick={() => {
                  this.setState({ showTestForm: !this.state.showTestForm });
                  if (this.state.showTestForm) {
                    // var doc = this.formFrame.contentWindow.document;
                    // doc.open();
                    // doc.write(
                    //   "<html><head><title></title><style>input { display: block;margin-bottom: 20px; }</style></head><body>" +
                    //     bucket.quickUseFormCode +
                    //     "</body></html>"
                    // );
                    // doc.close();
                  }
                }}
              >
                Quick test
              </a>
            </p>
            {!this.state.showTestForm ? null : (
              <p
                style={{
                  display: this.state.showTestForm ? "" : "none",
                  fontSize: "smaller"
                }}
              >
                <strong>Tip: </strong> Edit the code above.
              </p>
            )}
            {!this.state.showTestForm ? null : (
              <iframe
                sandbox="allow-same-origin allow-forms allow-scripts"
                style={{
                  border: "1px solid #EEE",
                  width: "100%",
                  height: 460
                }}
                ref={ref => {
                  this.formFrame = ref;
                }}
                src={`data:text/html;base64,${btoa(
                  `<html><head><title>FormBucket Test Page</title><style>body { margin: 0; padding: 10; } input { display: block;margin-bottom: 20px; }</style></head><body>${
                    bucket.quickUseFormCode
                  }</body></html>`
                )}`}
              />
            )}

            <p>
              <a
                href={`/buckets/${
                  bucket.id
                }/submissions/list/0/50/data,created_on`}
              >
                View Submissions
              </a>
            </p>

            <p>
              <a href={`/logs?offset=0&limit=10&bucket_id=${bucket.id}`}>
                View Logs
              </a>
            </p>
            <p>
              <a
                href={`/notifications?offset=0&limit=10&bucket_id=${bucket.id}`}
              >
                View Notifications
              </a>
            </p>
            {/* <p>
              <a
                href={`/notifications?offset=0&limit=10&bucket_id=${bucket.id}`}
              >
                View Webhooks
              </a>
            </p> */}
            <p>
              <a href="javascript:void(0)" onClick={downloadCSV}>
                Export Submissions to CSV
              </a>
            </p>
            <p>
              <a href="javascript:void(0)" onClick={download}>
                Export Submissions to JSON
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
