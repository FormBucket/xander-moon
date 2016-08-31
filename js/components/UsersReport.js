import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {eq} from 'functionfoundry'
import UserStore from '../stores/user'

import {
  requestBucketCountByUser,
  requestSubmissionCountByBucket,
  requestBucketCount,
  requestUserCount
} from '../stores/webutils'


const UserReport = React.createClass({
  getInitialState () {
    return {
      submissions: undefined,
      loaded: false,
      loading: false
    }
  },

  componentDidMount() {

    if (UserStore.isUserLoggedIn()) {

      this.setState({ loading: true })

      Promise.all([
        requestBucketCountByUser(),
        requestSubmissionCountByBucket()
      ])
      .then(values => this.setState({
        loading: false,
        loaded: true,
        countByUser: values[0],
        countByBucket: Object.keys(values[1])
        .map(d => ({ bucket: d, count: values[1][d] }))
        .sort((a,b) => a.count > b.count)
        .reverse()
      }))
      .catch(error => this.setState({ error: error }))

    }
  },

  render () {

    if (eq(this.state.loaded, false)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }

    console.log(this.state)


    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Users Report</h1>
          </div>
        </div>
        <div className="wrapper">
          <div>
            Total Bucket Count: {this.state.countByBucket.length}
          </div>
          <div>
            Total User Count: {this.state.countByUser.length}
          </div>
          <h2>Users</h2>
          <table>
            <tr>
              <th>Email</th>
              <th>Bucket Count</th>
              <th>Submission Count</th>
            </tr>
            {
              this.state.countByUser.map((d) => (
                <tr>
                  <td><a href={"/admin/user_report/" + d.id }>{d.email}</a></td>
                  <td>{d.bucketCount}</td>
                  <td>{d.submissionCount}</td>
                </tr>
              ))
            }
          </table>
          <h2>Submission Count by Bucket</h2>
          <table>
            <tr>
              <th>Bucket Id</th>
              <th>Count</th>
            </tr>
            {
              this.state.countByBucket.map((d) => (
                <tr>
                  <td>{d.bucket}</td>
                  <td>{d.count}</td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>
    )
  }
})

export default UserReport
