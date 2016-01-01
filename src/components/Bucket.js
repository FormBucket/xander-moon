import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND, ISARRAY} from 'functionfoundry'
import {Plans} from 'formbucket-common'
import UserStore from '../stores/user'
import {updateBucket} from '../stores/ActionCreator'

const NewBucket = React.createClass({

  getInitialState () {
    var mode = this.props.location.pathname === '/buckets/new' ? 'new' : 'edit'
    if (mode === 'edit') {
      var bucket = BucketStore.find( this.props.params.id )
      console.log('bucket', bucket, this.props.params.id)
      return Object.assign(bucket, { mode: mode })
    }
    return { mode: mode }
  },

  componentWillMount() {
  },

  componentDidUpdate(prevProps, prevState) {
    console.log('match', this.state === prevState )
    console.log('state', JSON.stringify(this.state, null, 4))
  },

  toggleAutoResponder(e) {
    this.setState( { auto_responder : e.target.checked ? {
      from: this.refs.auto_responder_from.value,
      subject: this.refs.auto_responder_subject.value,
      body: this.refs.auto_responder_body.value } : false } )
    },

    onSave (e) {
      var bucket = this.state
      // FIXME: Remove
      console.log(bucket)
      updateBucket(bucket, (err, result) => {
        console.log('updateBucket', err, result)
        this.props.history.push('/dashboard')
      })
    },

    render () {
      return (
        <div>
          <div className="page-heading">
            <div className="wrapper">
              <h1>{ this.state.mode === 'new' ? 'New Bucket' : 'Edit Bucket' }</h1>
            </div>
          </div>
          <div className="wrapper">
            <div className="bucket-details">
              <h3>Bucket ({this.state.id})</h3>
              <label htmlFor="bucketName">Name</label>
              <input type="text" id="bucketName" ref="bucketName" placeholder="e.g. Beta Signups" autoFocus={focus} onChange={ (e) => this.setState({ name: e.target.value }) } defaultValue={this.state.name} />
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
                <a style={{ cursor: 'pointer' }} onClick={() => this.setState({webhooks: this.state.webhooks.concat([''])})}><FontAwesome name='plus' /> Add webhook</a>
              </div>
              <label>
                <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" onChange={this.toggleAutoResponder} checked={ this.state.auto_responder }/>
                Automatically send an email to bucket submitters
              </label>
              <div className="autoresponder-wrapper" style={{ display: this.state.auto_responder ? '' : 'none' } }>
                <label htmlFor="fromEmail">From</label>
                <input type="text" ref="auto_responder_from" placeholder="sean@functionfoundry.com"
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
                  Note: Your form must have a <strong>from</strong> field to use this feature.
                </span>
              </div>
              <h3>Notifications</h3>
              <label>
                <input type="radio" name="email_to" value="none" onClick={() => this.setState({ email_to: false })}  checked={ this.state.email_to === false } /> Do not send notifications
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
                <input type="button" className="button" onClick={this.onSave} value="Save Bucket" />
              </div>
              {
                /*

                */
              }
              <Markdown
                source={ '```JSON\n' + JSON.stringify(this.state, null, 4) + '\n```' }
                options={ markdownOptions }>
              </Markdown>
            </div>
          </div>
        )
      }
    }
  )

export default NewBucket
