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
        requestBucketCount(),
        requestUserCount(),
        requestSubmissionCountByBucket()
      ])
      .then(values => this.setState({
        loading: false,
        loaded: true,
        countByUser: values[0],
        bucketCount: values[1],
        userCount: values[2],
        countByBucket: Object.keys(values[3])
        .map(d => ({ bucket: d, count: values[3][d] }))
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
            <h1>User Report</h1>
          </div>
        </div>
        <div className="wrapper">
          <div>
            Total Bucket Count: {this.state.bucketCount}
          </div>
          <div>
            Total User Count: {this.state.userCount}
          </div>
          <h2>Bucket Count by User</h2>
          <table>
            <tr>
              <th>Email</th>
              <th>Count</th>
            </tr>
            {
              this.state.countByUser.map((d) => (
                <tr>
                  <td>{d.email}</td>
                  <td>{d.count}</td>
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
