import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {Plans} from 'formbucket-common'

const NewForm = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>New Form</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="form-details">
            <h3>Settings</h3>
            <label for="formName">Form Name</label>
              <input type="text" id="formName" placeholder="e.g. Beta Signups" autoFocus={focus}/>
            <label for="originDomain">Origin Domain</label>
              <input type="text" id="originDomain" />
            <hr/>
            <h3>Actions</h3>
            <label for="redirectURL">Redirect URL</label>
              <input type="text" id="redirectURL" />
            <label for="webhook1">Webhook</label>
              <input type="text" id="webhook1" />
            <a href="#"><FontAwesome name='plus' /> Add another webhook</a>
            <label>
              <input type="checkbox" className="checkbox autoresponder" name="sendAutoresponder" value="check_1"/> Automatically send an email to form submitters
            </label>
            <div className="autoresponder-wrapper">
              <label for="fromEmail">From Email</label>
                <input type="text" id="fromEmail" placeholder="sean@functionfoundry.com"/>
              <label for="subject">Subject</label>
                <input type="text" id="subject" placeholder="Thanks!"/>
              <label for="emailBody">Body</label>
                <textarea id="emailBody" placeholder="Really appreciate it."></textarea>
            </div>
            <hr/>
            <h3>Notifications</h3>
            <label>
            <input type="checkbox" className="checkbox" name="sendSubmissions" value="check_1"/> Send notifications of new submissions to sean@functionfoundry.com
            </label>
            <label>
              <input type="checkbox" className="checkbox" name="ccSubmissions" value="check_1"/> Send notifications to these email addresses as well...
              <textarea className="cc-emails" placeholder="Multiple recipients separated by commas"></textarea>
            </label>
            <input className="button" type="submit" value="Save This Form" />
          </div>
        </div>
      </div>
    )
  }
})

export default NewForm
