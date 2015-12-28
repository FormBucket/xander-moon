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
            <label for="formName">Form Name</label>
            <input type="text" id="formName" placeholder="e.g. Beta Signups" autoFocus={focus}/>
            <label for="redirectURL">Redirect URL</label>
            <input type="text" id="redirectURL" />
            <hr/>
            <label>
            <input type="checkbox" class="checkbox" name="sendSubmissions" value="check_1"/> Send new submission notifications to sean@functionfoundry.com
            </label>
            <input className="button" type="submit" value="Create Form" />
          </div>
        </div>
      </div>
    )
  }
})

export default NewForm
