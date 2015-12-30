import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {Plans} from 'formbucket-common'
import UserStore from '../stores/user'
import {createForm} from '../stores/ActionCreator'

const NewForm = React.createClass({

  onSave (e) {
    var form = {
      name: this.refs.formName.value,
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
    console.log(form)
    createForm(form, () => {
      this.props.history.push('/dashboard')
    })
  },

  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{ this.props.location.pathname === '/forms/new' ? 'New Form' : 'Edit Form' }</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="form-details">
            <h3>Settings</h3>
            <label htmlFor="formName">Form Name</label>
              <input type="text" id="formName" ref="formName" placeholder="e.g. Beta Signups" autoFocus={focus}/>
            <label htmlFor="originDomain">Origin Domain</label>
              <input type="text" id="originDomain" />
            <hr/>
            <h3>Actions</h3>
            <label htmlFor="redirectURL">Redirect URL</label>
              <input type="text" id="redirectURL" ref="redirectURL" />
            <label htmlFor="webhook1">Webhook</label>
              <input type="text" id="webhook1" ref="webhook1" />
              <a href="#"><FontAwesome name='plus' /> Add another webhook</a>
            <label>
              <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" value="check_1"/> Automatically send an email to form submitters
            </label>
            <div className="autoresponder-wrapper">
              <label htmlFor="fromEmail">From Email</label>
                <input type="text" id="fromEmail" placeholder="sean@functionfoundry.com"/>
              <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Thanks!"/>
              <label htmlFor="emailBody">Body</label>
                <textarea id="emailBody" placeholder="Really appreciate it."></textarea>
            </div>
            <hr/>
            <h3>Notifications</h3>
            <label>
            <input type="checkbox" className="checkbox" name="sendSubmissions" ref="sendSubmissions" value="check_1"/>
              Send notifications of new submissions to {UserStore.getEmail()}
            </label>
            <label>
              <input type="checkbox" className="checkbox" name="ccSubmissions" ref="ccSubmissions" value="check_1"/>
                Send notifications to these email addresses as well...
              <textarea className="cc-emails" ref="additionalEmails" placeholder="Multiple recipients separated by commas"></textarea>
            </label>
            <input className="button" type="submit" onClick={this.onSave} value="Save This Form" />
          </div>
        </div>
      </div>
    )
  }
})

export default NewForm
