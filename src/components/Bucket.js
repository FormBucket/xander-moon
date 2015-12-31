import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {Plans} from 'formbucket-common'
import UserStore from '../stores/user'
import {createBucket} from '../stores/ActionCreator'

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

  toggleAutoResponder(e) {
    this.setState( { auto_responder : e.target.checked } )
  },

  onSave (e) {
    var bucket = {
      name: this.refs.bucketName.value,
      redirect_url: this.refs.redirectURL.value,
      webhooks: [ this.refs.webhook1.value ],
      email_to: COND(
        this.refs.sendSubmissions.checked,
        UserStore.getEmail(),
        this.refs.ccSubmissions.checked,
        this.refs.additionalEmails.value ),
        email_cc: COND(
          this.refs.sendSubmissions.checked && this.refs.ccSubmissions.checked,
          this.refs.additionalEmails.value)
        }
        // FIXME: Remove
        console.log(bucket)
        createBucket(bucket, () => {
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
                {
                  this.state.webhooks.map( (webhook, i) => (
                    <div key={i} >
                      <a style={{ position: 'relative', float: 'right', right: '10px', top: '47px', marginTop: -40, color: 'red', cursor: 'pointer' }}
                        onClick={ () => { var updated = this.state.webhooks.filter( (v, k) => i !== k ); console.log('updated', updated); this.setState({ webhooks: updated }); console.log('after', this.state.webhooks); } }>
                        <FontAwesome name='minus' />
                      </a>
                      <input type="text" id={"webhook" + i } defaultValue={webhook} />
                    </div>
                  ))
                }
                <div>
                  <a style={{ cursor: 'pointer' }} onClick={() => this.setState({webhooks: this.state.webhooks.concat([''])})}><FontAwesome name='plus' /> Add webhook</a>
                </div>
                <label>
                  <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" onClick={this.toggleAutoResponder} value="check_1"/> Automatically send an email to bucket submitters
                  </label>
                  <div className="autoresponder-wrapper" style={{ display: this.state.auto_responder ? '' : 'none' } }>
                    <label htmlFor="fromEmail">From Email</label>
                    <input type="text" id="fromEmail" placeholder="sean@functionfoundry.com"/>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" placeholder="Thanks!"/>
                    <label htmlFor="emailBody">Body</label>
                    <textarea id="emailBody" placeholder="Really appreciate it."></textarea>
                    <span>Note: Your form must have a <strong>from</strong> field to use this feature.</span>
                  </div>
                  <h3>Notifications</h3>
                  <label>
                    <input type="radio" name="email_to" value="none" onClick={() => this.setState({ email_to: false })}  checked={ this.state.email_to === false } /> Do not send notifications
                    </label>
                    <label>
                      <input type="radio" name="email_to" ref="sendSubmissions" value="default" onClick={() => this.setState({ email_to: null })} checked={ this.state.email_to === null } />
                      Send notifications to {UserStore.getEmail()}
                    </label>
                    <label>
                      <input type="radio" name="email_to" ref="ccSubmissions" value="custom" onClick={() => this.setState({ email_to: '' })} checked={ typeof this.state.email_to === 'string' }/>
                      Send notifications to:
                      <textarea disabled={typeof this.state.email_to === 'string' ? false : true} className="cc-emails" ref="additionalEmails" placeholder="Separate addresses by comma" onChange={(e) => this.setState({ email_to: e.target.value })} defaultValue={ typeof this.state.email_to === 'string' ? this.state.email_to : '' }></textarea>
                    </label>
                  </div>
                </div>
                <pre style={{ position: 'absolute', right: 0, top: 300, width: 600 }}>
                  {JSON.stringify(this.state, null, 4)}
                </pre>
              </div>
            )
          }
        })

        export default NewBucket
