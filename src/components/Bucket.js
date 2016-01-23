import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import {COND, ISARRAY, ISBLANK} from 'functionfoundry'
import UserStore from '../stores/user'
import {loadBucket, updateBucket} from '../stores/ActionCreator'

const NewBucket = React.createClass({

  getInitialState: function() {
    return {
      loaded: false
    };
  },

  componentWillMount() {

    loadBucket(this.props.params.id)
    .then(bucket => this.setState( Object.assign( { loaded: true}, bucket ) ))
    .catch(err => this.setState( { error: err } ))

  },

  componentDidUpdate(prevProps, prevState) {
    console.log('match', this.state === prevState )
    console.log('state', JSON.stringify(this.state, null, 4))
  },

  toggleAutoResponder(e) {
    this.setState( { auto_responder : e.target.checked ? {
      from: this.refs.auto_responder_from.value,
      subject: this.refs.auto_responder_subject.value,
      body: this.refs.auto_responder_body.value } : false
    })
  },

  onSave (e) {
    var bucket = this.state

    updateBucket( bucket )
    .then(result => this.props.history.push('/buckets'))
    .catch(err => {
      console.log('ERROR', err)
      this.setState({ error: err })
    })
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
            <h1>{ this.state.name && this.state.name.length > 0 ? this.state.name : `Bucket (${this.state.id})` }</h1>
          </div>
        </div>
        <div className="wrapper">
          <h3>Bucket ({this.state.id})</h3>
          <div className="bucket-details">
            <div className="section">
              <label htmlFor="bucketName">Name</label>
              <input type="text" id="bucketName" ref="bucketName" placeholder="e.g. Beta Signups" autoFocus={focus} onChange={ (e) => this.setState({ name: e.target.value }) } defaultValue={this.state.name} />
            </div>
            <div className="section">
              <label htmlFor="bucketEnabled" className="label-switch"> Enabled
                <input id="bucketEnabled" type="checkbox" onChange={(event) => this.setState({ enabled: event.target.checked }) } checked={this.state.enabled} />
                <div className="checkbox"></div>
              </label>
            </div>
            <div className="section">
              <h3>Actions</h3>
              <label htmlFor="redirectURL">Redirect URL</label>
              <input type="text" id="redirectURL" ref="redirectURL"  onChange={ (e) => this.setState({ redirect_url: e.target.value }) }  defaultValue={this.state.redirect_url} />
              <label>Webhooks</label>
              { ISARRAY(this.state.webhooks) ?
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
              <label>
                <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" onChange={this.toggleAutoResponder} checked={ this.state.auto_responder }/>
                Automatically send an email to bucket submitters
              </label>
              <div className="autoresponder-wrapper" style={{ display: this.state.auto_responder ? '' : 'none' } }>
                <label htmlFor="fromEmail">From</label>
                <input type="text" ref="auto_responder_from" placeholder={UserStore.getEmail()}
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { from: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.from : '' }
                  />
                <label htmlFor="subject">Subject</label>
                <input type="text" ref="auto_responder_subject" placeholder="Thanks!"
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { subject: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.subject : '' }
                  />
                <label htmlFor="emailBody">Body</label>
                <textarea ref="auto_responder_body" placeholder="Really appreciate it."
                  onChange={(e) => this.setState({ auto_responder: Object.assign({}, this.state.auto_responder, { body: e.target.value } ) })}
                  defaultValue={ this.state.auto_responder ? this.state.auto_responder.body : ''}
                  >
                </textarea>
                <span>
                  Note: Your form must have an <strong>email address</strong> field to use this feature.
                </span>
              </div>
            </div>
            <div className="section">
              <h3>Notifications</h3>
              <label>
                <input type="radio" name="email_to" value="none" onClick={() => this.setState({ email_to: false })}  checked={ !this.state.email_to } />
                Do not send notifications
              </label>
              <label>
                <input type="radio" name="email_to" ref="sendSubmissions" value="default" onClick={() => this.setState({ email_to: true })} checked={ this.state.email_to === true } />
                Send notifications to {UserStore.getEmail()}
              </label>
              <label>
                <input type="radio" name="email_to" ref="ccSubmissions" value="custom" onClick={() => this.setState({ email_to: this.refs.additionalEmails.value })} checked={ typeof this.state.email_to === 'string' }/>
                Send notifications to:
                <textarea disabled={typeof this.state.email_to === 'string' ? false : true} className="cc-emails" ref="additionalEmails" placeholder="Separate addresses by comma" onChange={(e) => this.setState({ email_to: e.target.value })} defaultValue={ typeof this.state.email_to === 'string' ? this.state.email_to : '' }></textarea>
              </label>
              <input type="button" className="button" onClick={this.onSave} value="Update Settings" />
            </div>
          </div>
          <div className="bucket-preview">
            <h3>API Preview</h3>
            <Markdown
              source={ '```JSON\n' + JSON.stringify(this.state, null, 4) + '\n```' }
              options={ markdownOptions }>
            </Markdown>
          </div>
        </div>
      </div>
    )
  }
}
)

export default NewBucket
