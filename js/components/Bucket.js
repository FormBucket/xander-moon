import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import {branch, isArray, isBlank, isEmpty} from 'formula'
import UserStore from '../stores/user'
import {
  requestBucket, requestProfile,
  requestUpdateBucket, requestDeleteBucket,
  requestBucketExport, requestDownloadFile }
from '../stores/webutils'
import FlashMessage from './FlashMessage'
import { router, dispatch, createStore, Link } from 'xander'
import Layout from './Layout'

import BucketsStore from '../stores/buckets'
import BucketStore from '../stores/bucket'

// import {Controlled as CodeMirror} from 'react-codemirror2'
// require('codemirror/mode/xml/xml');

function resetForm(recaptcha_on) {
  if (!recaptcha_on) return;

  setTimeout(() => {
    if (grecaptcha) {
      grecaptcha.render('g-recaptcha-container', {
        sitekey: '6LcC9kwUAAAAAKZkAPmBWJeHh13qX4R5jCLlENBT'
      });

      document.getElementById('my-awesome-form').onsubmit = () => {
        console.log('check form')
        if (recaptcha_on) {
          if (grecaptcha.getResponse() == '') {
            return false;
          }resetForm
        }
        return true;
      }
    }
  }, 250);
}

function makeHTMLForm({id, honey_pot_on, honey_pot_field, recaptcha_on, recaptcha_secret}) {

  resetForm(recaptcha_on);

  return (`${(recaptcha_on ? `<script src="https://www.google.com/recaptcha/api.js"></script>
` : '')}<form id="my-awesome-form" action="${process.env.FORMBUCKET_API_SERVER}/f/${id}" method="post" target="_blank">
  <input type="text" name="email" placeholder="Email" />
  <input type="text" name="message" placeholder="Message" />${honey_pot_on ? `
  <label style="display:none">Honey pot (Should be hidden and empty)</label>
  <input type="text" name="${isEmpty(honey_pot_field) ? '__bucket_trap__' : honey_pot_field }" style="display: none" />` : ''}${recaptcha_on ? `
  <div id="g-recaptcha-container" class="g-recaptcha" data-sitekey="{put-your-site-key-here}"></div>` : ``}
  <button class="button secondary" type="submit">Submit</button>
</form>`)
}

function setState(props) {
  console.log('setState', props)
  dispatch('changeBucket', props)
}

class NewBucket extends React.Component {
  state = {
    loaded: false,
    email_to: false,
    advanced_notification_on: false
  };

  componentDidMount() {

    let {id} = this.props.router.params;
    dispatch('initBucket', id )

    if (!UserStore.isUserLoggedIn()) {
      router.open('/login')
    }

    if (this.props.buckets && this.props.buckets.byid) {
      let bucket = (this.props.buckets.byid[id]||[])[0]
      if (bucket && bucket.updated_on){
        console.log('reload cache hit')
        setTimeout( () => dispatch('loadBucket', bucket), 0 )
      }
    }

    Promise.all([
      requestBucket(this.props.router.params.id),
      requestProfile()
    ]).then(([bucket, user]) => {
      setTimeout( () => dispatch('loadBucket', bucket), 0 )
      dispatch('loadProfile', user)
      return Promise.resolve([bucket, user])
    })
    .catch(err => setState( { error: err } ))

  }

  componentWillUnmount() {
    dispatch('resetBucket')
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('match', bucket === prevState )
    // console.log('state', JSON.stringify(bucket, null, 4))
  }

  toggleAutoResponder = (e) => {

    setState( { auto_responder: false })

    if (e.target.checked) {
      setState({
        auto_responder : {
          from: this.refs.auto_responder_from.value,
          subject: this.refs.auto_responder_subject.value,
          body: this.refs.auto_responder_body.value
        }
      })
    }

  };

  onSave = (e) => {

    var {
      id,
      name,
      enabled,
      email_to,
      email_cc,
      redirect_url,
      webhooks,
      auto_responder,
      advanced_notification_on,
      notification_from,
      notification_reply_to,
      notification_subject,
      notification_template,
      recaptcha_on,
      recaptcha_secret,
      recaptcha_redirect,
      honey_pot_on,
      honey_pot_field,
      is_api_request
    } = BucketStore.merge();

    requestUpdateBucket({
      id,
      name,
      enabled,
      email_to,
      email_cc,
      redirect_url,
      webhooks,
      auto_responder,
      advanced_notification_on,
      notification_from,
      notification_reply_to,
      notification_subject,
      notification_template,
      recaptcha_on,
      recaptcha_secret,
      recaptcha_redirect,
      honey_pot_on,
      honey_pot_field,
      is_api_request
    })
    .then(result => {

      setState({
        saving: false,
        flash: 'Saved'
      })

      setTimeout(() => setState({ flash: undefined }), 2000)

    })
    .catch(err => {
      // console.log('ERROR', err)
      setState({ error: err })
    })
  };

  onDelete = (e) => {
    var bucket = BucketStore.merge();

    if (!confirm("This will delete the bucket and all your submissions. Continue?")) {
      return;
    }

    requestDeleteBucket( bucket.id )
    .then(result => router.open('/buckets'))
    .catch(err => {
      console.log('ERROR', err)
      setState({ error: err })
    })
  };

  onDownload = (bucket) => {
    requestBucketExport(bucket.id)
    .then(result => requestDownloadFile(result))
  };

  onDownloadCSV = (bucket) => {
    requestBucketExport(bucket.id, 'csv')
    .then(result => requestDownloadFile(result))
  };

  onChangeAutoResponderMessage = (value) => {
    if (!value) return;

    setState({
      auto_responder_content: value,
      auto_responder: Object.assign(
        {}, bucket.auto_responder, { body: value.toString('markdown') }
      )
    });

  };

  render() {

    let bucket = BucketStore.merge()
    let savedBucket = this.props.buckets.buckets.filter((d) => d.id === this.props.bucket.id)[0]

    let {user, buckets } = this.props;

    bucket.user = user||{}

    console.log('bucket', bucket)
    console.log('savedBucket', savedBucket)

    // console.log(bucket)
    if (bucket.error) {
      return <div>{bucket.error}</div>
    }

    if (!bucket.id) {
      return (
        <Layout className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      )
    }

    console.log('bucket2', bucket)


    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{ bucket.name && bucket.name.length > 0 ? bucket.name : bucket.id }</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="bucket-details">
            <div className="section">
              <h3>Name</h3>
              <input type="text" id="bucketName" ref="bucketName" placeholder="e.g. Beta Signups" autoFocus={focus} onChange={ (e) => setState({ name: e.target.value }) } defaultValue={bucket.name} />
              <label htmlFor="bucketEnabled" className="label-switch"> Accept Submissions?
                <input id="bucketEnabled" type="checkbox" onClick={(event) => setState({ enabled: event.target.checked }) } checked={bucket.enabled} />
                <div className="checkbox"></div>
              </label>
            </div>
            <div className="section">
              <h3>Custom Redirect</h3>
              <label htmlFor="redirectURL">Send users to this URL after submitting the form</label>
              <input type="text" placeholder="Send to formbucket default landing page, supports merge tags" id="redirectURL" ref="redirectURL"  onChange={ (e) => setState({ redirect_url: e.target.value }) }  disabled={bucket.is_api_request} defaultValue={bucket.redirect_url} />
              <label htmlFor="bucketAJAXOnly" className="label-switch"> <a href="/guides/json-endpoints">JSON Endpoint?</a>
                <input id="bucketAJAXOnly" type="checkbox" onChange={(event) => setState({ is_api_request: event.target.checked }) } checked={bucket.is_api_request} />
                <div className="checkbox"></div>
              </label>
            </div>
            <div className="section">
              <h3>Notifications</h3>
              <label>
                <input type="radio" onChange={() => setState({ email_to: false })}  checked={ bucket.email_to === false } />
                Do not send notifications
              </label>
              <label>
                <input type="radio" onClick={() => setState({ email_to: true })} checked={ bucket.email_to === true } />
                Send notifications to {bucket.user.email}
              </label>
              <label>
                <input type="radio" onClick={() => setState({ email_to: '' + this.refs.additionalEmails.value })} checked={ typeof bucket.email_to === 'string' }/>
                Send notifications to:
                <textarea disabled={typeof bucket.email_to === 'string' ? false : true} className="cc-emails" ref="additionalEmails" placeholder="Separate addresses by comma" onChange={(e) => setState({ email_to: e.target.value })} defaultValue={ typeof bucket.email_to === 'string' ? bucket.email_to : '' }></textarea>
              </label>
              <label>
                <input type="checkbox" className="checkbox" name="enableAdvancedNotificationSettings" onChange={ () => setState({ advanced_notification_on: !bucket.advanced_notification_on }) } checked={ bucket.advanced_notification_on } />
                Advanced Settings (optional)
              </label>
              <div className="autoresponder-wrapper" style={{ display: bucket.advanced_notification_on ? '' : 'none' } }>
                <label htmlFor="notificationFrom">Sent From:</label>
                <input name="notificationFrom" type="text" placeholder="Defaults to support@formbucket.com"
                  onChange={(e) => setState({ notification_from: e.target.value }) }
                  defaultValue={ bucket.notification_from }
                  />
                <label htmlFor="notificationReplyTo">Reply to:</label>
                <input name="notificationReplyTo" type="text" placeholder="Defaults to {{ email }} or {{ _replyto }}, otherwise your email"
                  onChange={(e) => setState({ notification_reply_to: e.target.value }) }
                  defaultValue={ bucket.notification_reply_to }
                  />
                <label htmlFor="notificationReplyTo">CC:</label>
                <input name="notificationReplyTo" type="text" placeholder="Defaults to {{ _cc }}, otherwise blank"
                  onChange={(e) => setState({ email_cc: e.target.value }) }
                  defaultValue={ bucket.email_cc }
                  />
                <label htmlFor="notificationSubject" htmlFor="subject">Subject</label>
                <input name="notificationSubject" type="text" ref="auto_responder_subject" placeholder="Defaults to {{ _subject }}, otherwise &quot;Submission for {{bucket_name}}&quot;"
                  onChange={(e) => setState({ notification_subject: e.target.value })}
                  defaultValue={ bucket.notification_subject }
                  />
                <label htmlFor="notificationTemplate">Body (supports Markdown)</label>
                <textarea name="notificationTemplate" ref="auto_responder_body"
                  placeholder="Send default notification"
                  onChange={(e) => setState({ notification_template: e.target.value })}
                  defaultValue={ bucket.notification_template }
                  >
                </textarea>
                <div>
                  <a href="/guides/merge-tags" target="_blank">Learn about merge tags</a>
                </div>
                <div>
                  <a href="https://daringfireball.net/projects/markdown/  " target="_blank">Learn about Markdown</a>
                </div>
                {/*}<RichTextEditor
                  value={bucket.auto_responder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div className="section">
              <h3>Autoresponder</h3>
              <label>
                <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" onChange={this.toggleAutoResponder} checked={ bucket.auto_responder } />
                Automatically send an email to form submitters
              </label>
              <div className="autoresponder-wrapper" style={{ display: bucket.auto_responder ? '' : 'none' } }>
                <p>
                  <FontAwesome name='exclamation-circle' /> Note: Your form must have an <strong>email address</strong> field to use this feature.
                </p>
                <label htmlFor="fromEmail">From</label>
                <input type="text" ref="auto_responder_from"
                  onChange={(e) => setState({ auto_responder: Object.assign({}, bucket.auto_responder, { from: e.target.value } ) })}
                  defaultValue={ bucket.auto_responder ? bucket.auto_responder.from : bucket.user.email }
                  />
                <label htmlFor="toEmail">To</label>
                <input type="text" ref="auto_responder_to" placeholder="Defaults to {{ email }}"
                  onChange={(e) => setState({ auto_responder: Object.assign({}, bucket.auto_responder, { to: e.target.value } ) })}
                  defaultValue={ bucket.auto_responder ? bucket.auto_responder.to : null }
                  />
                <label htmlFor="subject">Subject</label>
                <input type="text" ref="auto_responder_subject" placeholder="Thanks!"
                  onChange={(e) => setState({ auto_responder: Object.assign({}, bucket.auto_responder, { subject: e.target.value } ) })}
                  defaultValue={ bucket.auto_responder ? bucket.auto_responder.subject : '' }
                  />
                <label htmlFor="emailBody">Body (supports Markdown)</label>
                <textarea ref="auto_responder_body"
                  onChange={(e) => setState({ auto_responder: Object.assign({}, bucket.auto_responder, { body: e.target.value } ) })}
                  defaultValue={ bucket.auto_responder ? bucket.auto_responder.body : ''}
                  >
                </textarea>
                <div>
                  <a href="/guides/merge-tags" target="_blank">Learn about merge tags</a>
                </div>
                <div>
                  <a href="https://daringfireball.net/projects/markdown/  " target="_blank">Learn about Markdown</a>
                </div>
                {/*}<RichTextEditor
                  value={bucket.auto_responder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div className="section">
              <h3>Webhooks</h3>
              { isArray(bucket.webhooks) ?
                bucket.webhooks.map( (webhook, i) => (
                  <div key={i} >
                    <a style={{ position: 'relative', float: 'right', right: '-30px', top: '42px', paddingTop: 5, paddingBottom: 5, paddingRight: 7, paddingLeft: 7, marginTop: -40, color: 'red', backgroundColor: 'white', cursor: 'pointer' }}
                      onClick={ () => { var updated = bucket.webhooks.filter( (v, k) => i !== k ); setState({ webhooks: updated }); } }>
                      <FontAwesome name='minus' />
                    </a>
                    <input type="text" id={"webhook" + i }
                      onChange={(e) => { var updated = bucket.webhooks.map((v, k) => i === k ? e.target.value : v); setState({ webhooks: updated })  } }
                      defaultValue={webhook} />
                  </div>
                )) : ''
              }
              <div>
                <a style={{ cursor: 'pointer' }} onClick={() => setState({webhooks: bucket.webhooks ? bucket.webhooks.concat(['']) : [''] })}><FontAwesome name='plus' /> Add webhook</a>
              </div>
            </div>
            <div className="section">
              <h3>Spam and Bot Protection</h3>

              <label htmlFor="honeyPotEnabled" className="label-switch">
                Honey Pot
                <input id="honeyPotEnabled" type="checkbox" onClick={(event) => setState({ honey_pot_on: event.target.checked }) } checked={bucket.honey_pot_on} />
                <div className="checkbox"></div>
              </label>
              <br />
              <br />
              {
                branch( bucket.honey_pot_on,

                  <div>
                    <label>
                      Honey pot field
                      {' '}<a className="pull-right" href="/guides/honeypot">Honey pot?</a>
                      <input placeholder="Optional custom fieldname" onChange={(e) => setState({ honey_pot_field:  e.target.value  })}
                      defaultValue={ bucket.honey_pot_field }/>
                  </label>
                </div>)
              }

              <label htmlFor="recaptchaEnabled" className="label-switch"> Recaptcha
                <input id="recaptchaEnabled" type="checkbox" onClick={(event) => setState({ recaptcha_on: event.target.checked }) } checked={bucket.recaptcha_on} />
                <div className="checkbox"></div>
              </label>
              {
                branch( bucket.recaptcha_on,
                  <div className="spam-protection">
                    <label>
                      Secret key (provided by Google)

                      <input onChange={(e) => setState({ recaptcha_secret:  e.target.value  })}
                      defaultValue={ bucket.recaptcha_secret }/>
                    </label>
                    <label><script src="https://www.google.com/recaptcha/api.js"></script>
                    </label>
                  </div>
                )
              }
            </div>
            {/*
              <div className="section">
                <h3>Submission View</h3>
                <label htmlFor="submissionLineFormula">Submission Line Formula</label>
                <Codemirror options={codeMirrorOptions} onChange={ (value) => setState({ submission_line_formula: value }) } value={bucket.submission_line_formula} />
              </div>
            */}
            <input type="button" className="button" onClick={this.onSave} value="Save Settings" />
          </div>
          <div className="bucket-preview">
            View:&nbsp;
            <Link to={`/buckets/${bucket.id}/submissions`}>Submissions</Link>
             &nbsp; <Link to={`/logs?offset=0&limit=10&bucket_id=${bucket.id}`}>
                Logs
              </Link>
          </div>
          <div className="bucket-preview">
            <div className="bucket-editor">
              <h4>Endpoint:</h4>
              <div>
                <input type="text" value={ process.env.FORMBUCKET_API_SERVER + "/f/" + bucket.id}></input>
              </div>
              {
                branch(
                  this.state.showEditor,
                  <div>
                    <hr />
                  <h4>Example HTML</h4>
                  <p>Copy and paste the markup below into your project, rep<script src="https://www.google.com/recaptcha/api.js"></script>lacing the example inputs with your own.</p>
                  <div className="quick-use" style={{ textAlign: 'left' }}>
                    <Markdown
                      source={ '```HTML\n' + makeHTMLForm(savedBucket) + '\n```' }
                      options={ markdownOptions }
                      />

                  </div>
                </div>,
                null
                )
              }

              <hr />


              <h4>Test Form (<a href="javascript:void(0)" onClick={() => {
                this.setState({ reset: true});
                setTimeout(() => this.setState({ reset: false}), 200 );
                return false;
              }}>Reset</a> | <a href="javascript:void(0)" onClick={() => {
                setTimeout(() => {
                  this.setState({ showEditor: !this.state.showEditor});
                  return false;
                }, 200 );
                return false;
              }}>{branch(this.state.showEditor, 'Hide', 'Show')} Example HTML</a>)</h4>
              <div>
                {
                  branch(
                    this.state.reset,
                    null,
                    <div dangerouslySetInnerHTML={{__html: makeHTMLForm(bucket) }} />
                  )
                }
              </div>

            </div>
          </div>
          <div className="bucket-preview">
            <p>
              <a href="javascript:void(0)" onClick={() => this.onDownloadCSV(bucket)} >
                Export submissions to CSV
              </a>
            </p>
            <p>
              <a href="javascript:void(0)" onClick={() => this.onDownload(bucket)} >
                Export submissions to JSON
              </a>
            </p>
            <p>
              <a className="danger" href="javascript:void(0)" onClick={this.onDelete} >
                Delete this Bucket
              </a>
            </p>
          </div>
        </div>
        <FlashMessage text={bucket.flash} />
      </Layout>
    )
  }
}

export default NewBucket
