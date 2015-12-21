import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import moment from 'moment'
import {COND} from 'functionfoundry'

const Dashboard = React.createClass({
  render () {
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
                  <button onClick={redirect('')}><FontAwesome name='plus' /> New Form</button>
                  <p>You are using 3 out of 5 available active forms in <Link to="billing">your plan</Link>.</p>
                </div>
                <table className="form-list">
                  <thead>
                    <tr>
                      <th>Form Name</th>
                      <th># Submissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><Link to="#"><FontAwesome name='gear' /> Contact</Link></td>
                      <td><h3><Link to="#">38</Link></h3></td>
                    </tr>
                    <tr>
                      <td><Link to="#"><FontAwesome name='gear' /> Beta Signup</Link></td>
                      <td><h3><Link to="#">3,099</Link></h3></td>
                    </tr>
                    <tr>
                      <td><Link to="#"><FontAwesome name='gear' /> Pre-Orders</Link></td>
                      <td><h3><Link to="#">201</Link></h3></td>
                    </tr>
                  </tbody>
                </table>
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
