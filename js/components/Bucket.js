import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import {branch, isArray, isBlank, isEmpty} from 'functionfoundry'
import UserStore from '../stores/user'
import {
  requestBucket, requestProfile,
  requestUpdateBucket, requestDeleteBucket,
  requestBucketExport, requestDownloadFile }
from '../stores/webutils'
import FlashMessage from './FlashMessage'
// import RichTextEditor from 'react-rte';
// import Codemirror from 'react-codemirror';
// import 'codemirror/mode/spreadsheet/spreadsheet'
//
// var codeMirrorOptions = {
//   lineNumbers: true,
//   mode: 'spreadsheet'
// };

function makeHTMLForm(id, honey_pot_on, honey_pot_field) {
  return (`<form action="${process.env.FORMBUCKET_API_SERVER}/f/${id}" method="post" target="_blank">
  <input type="text" name="email" placeholder="Email" />\n  <input type="text" name="message" placeholder="Message" />${honey_pot_on ? `
  <label>Honey pot (Should be empty and hidden)</label><input type="text" name="${isEmpty(honey_pot_field) ? '__bucket_trap__' : honey_pot_field }" value="" /*style="display: none"*/ />` : ''}
  <button class="button secondary" type="submit">Submit</button>
</form>`)
}

const NewBucket = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      email_to: false
    };
  },

  componentDidMount() {

    if (!UserStore.isUserLoggedIn()) {
      this.props.history.push('/login')
    }

    Promise.all([
      requestBucket(this.props.params.id),
      requestProfile() ])
      .then( result => this.setState( Object.assign(
        { loaded: true },
        result[0],
        { user: result[1] }
    )))
    .catch(err => this.setState( { error: err } ))

  },

  componentDidUpdate(prevProps, prevState) {
    // console.log('match', this.state === prevState )
    // console.log('state', JSON.stringify(this.state, null, 4))
  },

  toggleAutoResponder(e) {

    this.setState( { auto_responder: false })

    if (e.target.checked) {
      this.setState({
        auto_responder : {
          from: this.refs.auto_responder_from.value,
          subject: this.refs.auto_responder_subject.value,
          body: this.refs.auto_responder_body.value
        }
      })
    }

  },

  onSave (e) {

    var {
      id,
      name,
      enabled,
      email_to,
      email_cc,
      redirect_url,
      webhooks,
      auto_responder,
      notification_from,
      recaptcha_on,
      recaptcha_secret,
      recaptcha_redirect,
      honey_pot_on,
      honey_pot_field,
      is_api_request
    } = this.state

    requestUpdateBucket({
      id,
      name,
      enabled,
      email_to,
      email_cc,
      redirect_url,
      webhooks,
      auto_responder,
      notification_from,
      recaptcha_on,
      recaptcha_secret,
      recaptcha_redirect,
      honey_pot_on,
      honey_pot_field,
      is_api_request
    })
    .then(result => {

      this.setState({
        saving: false,
        flash: 'Saved'
      })

      setTimeout(() => this.setState({ flash: undefined }), 2000)

    })
    .catch(err => {
      // console.log('ERROR', err)
      this.setState({ error: err })
    })
  },

  onDelete(e) {
    var bucket = this.state

    if (!confirm("This will delete the bucket and all your submissions. Continue?")) {
      return;
    }

    requestDeleteBucket( bucket.id )
    .then(result => this.props.history.push('/buckets'))
    .catch(err => {
      console.log('ERROR', err)
      this.setState({ error: err })
    })
  },

  onDownload() {
    requestBucketExport(this.state.id)
    .then(result => requestDownloadFile(result))
  },

  onDownloadCSV() {
    requestBucketExport(this.state.id, 'csv')
    .then(result => requestDownloadFile(result))
  },

  onChangeAutoResponderMessage(value) {
    if (!value) return;

    this.setState({
      auto_responder_content: value,
      auto_responder: Object.assign(
        {}, this.state.auto_responder, { body: value.toString('markdown') }
      )
    });

  },

  render () {

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    if (!this.state.loaded) {
      return <div>Loading</div>
    }

    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{ this.state.name && this.state.name.length > 0 ? this.state.name : this.state.id }</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="bucket-details">
            <div className="section">
              <h3>Name</h3>
              <input type="text" id="bucketName" ref="bucketName" placeholder="e.g. Beta Signups" autoFocus={focus} onChange={ (e) => this.setState({ name: e.target.value }) } defaultValue={this.state.name} />
              <label htmlFor="bucketEnabled" className="label-switch"> Accept Submissions?
                <input id="bucketEnabled" type="checkbox" onClick={(event) => this.setState({ enabled: event.target.checked }) } checked={this.state.enabled} />
                <div className="checkbox"></div>
              </label>
            </div>
            <div className="section">
              <h3>Custom Redirect</h3>
              <label htmlFor="redirectURL">Send users to this URL after submitting the form</label>
              <input type="text" id="redirectURL" ref="redirectURL"  onChange={ (e) => this.setState({ redirect_url: e.target.value }) }  disabled={this.state.is_api_request} defaultValue={this.state.redirect_url} />
              <label htmlFor="bucketAJAXOnly" className="label-switch"> AJAX Only?
                <input id="bucketAJAXOnly" type="checkbox" onChange={(event) => this.setState({ is_api_request: event.target.checked }) } checked={this.state.is_api_request} />
                <div className="checkbox"></div>
              </label>
            </div>
            <div className="section">
              <h3>Autoresponder</h3>
              <label>
                <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" onChange={this.toggleAutoResponder} checked={ this.state.auto_responder } />
                Automatically send an email to form submitters
              </label>
              <div className="autoresponder-wrapper" style={{ display: this.state.auto_responder ? '' : 'none' } }>
                <p>
                  <FontAwesome name='exclamation-circle' /> Note: Your form must have an <strong>email address</strong> field to use this feature.
                </p>
                <label htmlFor="fromEmail">From</label>
                <input type="text" ref="auto_responder_from"
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { from: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.from : this.state.user.email }
                  />
                <label htmlFor="toEmail">To</label>
                <input type="text" ref="auto_responder_to" placeholder="Defaults to {{ email }}"
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { to: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.to : null }
                  />
                <label htmlFor="subject">Subject</label>
                <input type="text" ref="auto_responder_subject" placeholder="Thanks!"
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { subject: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.subject : '' }
                  />
                <label htmlFor="emailBody">Body (supports Markdown)</label>
                <textarea ref="auto_responder_body"
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { body: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.body : ''}
                  >
                </textarea>
                <div>
                  <a href="/guides/merge-tags" target="_blank">Learn about merge tags</a>
                </div>
                <div>
                  <a href="https://daringfireball.net/projects/markdown/  " target="_blank">Learn about Markdown</a>
                </div>
                {/*}<RichTextEditor
                  value={this.state.auto_responder_content}
                  onChange={this.onChangeAutoResponderMessage}
                />*/}
              </div>
            </div>
            <div className="section">
              <h3>Notifications</h3>
              <label htmlFor="subject">Sent From:</label>
              <input type="text" placeholder="Defaults to support@formbucket.com"
                onChange={(e) => this.setState({ notification_from: e.target.value }) }
                defaultValue={ this.state.notification_from }
                />
              <label>
                <input type="radio" onChange={() => this.setState({ email_to: false })}  checked={ this.state.email_to === false } />
                Do not send notifications
              </label>
              <label>
                <input type="radio" onClick={() => this.setState({ email_to: true })} checked={ this.state.email_to === true } />
                Send notifications to {this.state.user.email}
              </label>
              <label>
                <input type="radio" onClick={() => this.setState({ email_to: '' + this.refs.additionalEmails.value })} checked={ typeof this.state.email_to === 'string' }/>
                Send notifications to:
                <textarea disabled={typeof this.state.email_to === 'string' ? false : true} className="cc-emails" ref="additionalEmails" placeholder="Separate addresses by comma" onChange={(e) => this.setState({ email_to: e.target.value })} defaultValue={ typeof this.state.email_to === 'string' ? this.state.email_to : '' }></textarea>
              </label>
            </div>
            <div className="section">
              <h3>Webhooks</h3>
              { isArray(this.state.webhooks) ?
                this.state.webhooks.map( (webhook, i) => (
                  <div key={i} >
                    <a style={{ position: 'relative', float: 'right', right: '-30px', top: '42px', paddingTop: 5, paddingBottom: 5, paddingRight: 7, paddingLeft: 7, marginTop: -40, color: 'red', backgroundColor: 'white', cursor: 'pointer' }}
                      onClick={ () => { var updated = this.state.webhooks.filter( (v, k) => i !== k ); this.setState({ webhooks: updated }); } }>
                      <FontAwesome name='minus' />
                    </a>
                    <input type="text" id={"webhook" + i }
                      onChange={(e) => { var updated = this.state.webhooks.map((v, k) => i === k ? e.target.value : v); this.setState({ webhooks: updated })  } }
                      defaultValue={webhook} />
                  </div>
                )) : ''
              }
              <div>
                <a style={{ cursor: 'pointer' }} onClick={() => this.setState({webhooks: this.state.webhooks ? this.state.webhooks.concat(['']) : [''] })}><FontAwesome name='plus' /> Add webhook</a>
              </div>
            </div>
            <div className="section">
              <h3>Spam and Bot Protection</h3>

              <label htmlFor="honeyPotEnabled" className="label-switch">
                Honey Pot
                <input id="honeyPotEnabled" type="checkbox" onClick={(event) => this.setState({ honey_pot_on: event.target.checked }) } checked={this.state.honey_pot_on} />
                <div className="checkbox"></div>
              </label>
              <br />
              <br />
              {
                branch( this.state.honey_pot_on,
                  <div>
                    <label>
                      Honey pot field
                      {' '}<a className="pull-right" href="#">What is a honey pot?</a>
                      <input placeholder="Optional custom fieldname" onChange={(e) => this.setState({ honey_pot_field:  e.target.value  })}
                      defaultValue={ this.state.honey_pot_field }/>
                  </label>
                </div>)
              }

              <label htmlFor="recaptchaEnabled" className="label-switch"> Recaptcha
                <input id="recaptchaEnabled" type="checkbox" onClick={(event) => this.setState({ recaptcha_on: event.target.checked }) } checked={this.state.recaptcha_on} />
                <div className="checkbox"></div>
              </label>
              {
                branch( this.state.recaptcha_on,
                  <div className="spam-protection">
                    <label>
                      Secret key (provided by Google)

                      <input onChange={(e) => this.setState({ recaptcha_secret:  e.target.value  })}
                      defaultValue={ this.state.recaptcha_secret }/>
                    </label>
                    <label>
                      Redirect on error
                      <input placeholder="Optional, url to send user if verification fails" onChange={(e) => this.setState({ recaptcha_redirect:  e.target.value  })}
                      defaultValue={ this.state.recaptcha_redirect }/>
                    </label>
                  </div>
                )
              }
            </div>
            {/*
              <div className="section">
                <h3>Submission View</h3>
                <label htmlFor="submissionLineFormula">Submission Line Formula</label>
                <Codemirror options={codeMirrorOptions} onChange={ (value) => this.setState({ submission_line_formula: value }) } value={this.state.submission_line_formula} />
              </div>
            */}
            <input type="button" className="button" onClick={this.onSave} value="Save Settings" />
          </div>
          <div className="bucket-preview">
            <a href="#" onClick={(event) => { this.props.history.push('/buckets/' + this.state.id + '/submissions'); }}>View Submissions</a>
          </div>
          <div className="bucket-preview">
            <div className="bucket-editor">
              <h4>Endpoint:</h4>
              <div>
                <input type="text" value={ process.env.FORMBUCKET_API_SERVER + "/f/" + this.state.id}></input>
              </div>
              <hr />
              <h4>Sample HTML</h4>
              <p>Copy and paste the markup below into your project, replacing the example inputs with your own.</p>
              <div className="quick-use" style={{ textAlign: 'left' }}>
                <Markdown
                  source={ '```HTML\n' + makeHTMLForm(this.state.id, this.state.honey_pot_on, this.state.honey_pot_field) + '\n```' }
                  options={ markdownOptions }
                  />
              </div>
              <hr />
              <h4>Test Form</h4>
              <div>
                <div dangerouslySetInnerHTML={{__html: makeHTMLForm(this.state.id, this.state.honey_pot_on, this.state.honey_pot_field) }}>
                </div>
              </div>
            </div>
          </div>
          <div className="bucket-preview">
            <p>
              <a href="javascript:void(0)" onClick={this.onDownloadCSV} >
                Export all Submissions to CSV
              </a>
            </p>
            <p>
              <a href="javascript:void(0)" onClick={this.onDownload} >
                Export all Submissions to JSON
              </a>
            </p>
            <p>
              <a href="javascript:void(0)" onClick={this.onDelete} >
                Delete this Bucket
              </a>
            </p>
          </div>
        </div>
        <FlashMessage text={this.state.flash} />
      </div>
    )
  }
}
)

export default NewBucket
