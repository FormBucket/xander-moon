import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {loadForms} from '../stores/ActionCreator'
import FormStore from '../stores/forms'

const Dashboard = React.createClass({
  getInitialState() {
    return {
      forms: undefined
    }
  },
  componentDidMount() {
    loadForms()
    this.token = FormStore.addListener(this.handleFormsChanged)
  },
  componentWillUnmount() {
    this.token.remove()
  },
  handleFormsChanged() {
    this.setState({
      forms: FormStore.getForms()
    })
  },
  render() {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="wrapper">
          <ul className="accordion-tabs-minimal">
            <li className="tab-header-and-content">
              <a href="#" className="tab-link is-active">Active Forms</a>
              <div className="tab-content">
                <div className="callout">
                  <button onClick={redirect('/forms/new')}><FontAwesome name='plus' /> New Form</button>
                  <p>You are using 3 out of 5 available active forms in <Link to="billing">your plan</Link>.</p>
                </div>

                { typeof this.state.forms === 'undefined' ? 'Loading...' : (
                  <table className="form-list">
                    <thead>
                      <tr>
                        <th>Form Name</th>
                        <th># Submissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.forms.map(form => (
                          <tr key={form.id}>
                            <td><Link to={`/forms/update/${form.id}`}><FontAwesome name='gear' /> {form.name}</Link></td>
                            <td><h3><Link to="#">{form.submission_count}</Link></h3></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </div>
          </li>
          <li className="tab-header-and-content">
            <a href="#" className="tab-link">Archived Forms</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
})

export default Dashboard
