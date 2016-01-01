import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {loadBuckets, createBucket} from '../stores/ActionCreator'
import BucketStore from '../stores/buckets'

const Dashboard = React.createClass({
  getInitialState() {
    return {
      buckets: undefined
    }
  },
  componentDidMount() {
    loadBuckets()
    this.token = BucketStore.addListener(this.handleBucketsChanged)
  },
  componentWillUnmount() {
    this.token.remove()
  },
  handleNewBucket(event) {
    createBucket({}, (err, result) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('createdBucket with', result)
      this.props.history.push('/buckets/' + result.id)
    })
  },
  handleBucketsChanged() {
    this.setState({
      buckets: BucketStore.getBuckets()
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
              <a href="#" className="tab-link is-active">Active Buckets</a>
              <div className="tab-content">
                <div className="callout">
                  <button onClick={this.handleNewBucket}><FontAwesome name='plus' /> New Bucket</button>
                  <p>You are using 3 out of 5 available active buckets in <Link to="billing">your plan</Link>.</p>
                </div>

                { typeof this.state.buckets === 'undefined' ? 'Loading...' : (
                  <table className="bucket-list">
                    <thead>
                      <tr>
                        <th>Bucket Name</th>
                        <th># Submissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.buckets.map(bucket => (
                          <tr key={bucket.id}>
                            <td><Link to={`/buckets/${bucket.id}`}><FontAwesome name='gear' /> {bucket.name}</Link></td>
                            <td><h3><Link to="#">{bucket.submission_count}</Link></h3></td>
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
            <a href="#" className="tab-link">Archived Buckets</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
})

export default Dashboard
