// Author: Peter Moresi
import {COND, NOT, ISBLANK, ISFUNCTION} from 'functionfoundry'
import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import {loadBuckets, createBucket} from '../stores/ActionCreator'
import UserStore from '../stores/user'
import BucketStore from '../stores/buckets'
import SubmissionsStore from '../stores/Submissions'
import {loadSubmissionsByBucket, streamSubmissions} from '../stores/ActionCreator'

import BucketTable from './BucketTable'

const Buckets = React.createClass({
  getInitialState() {
    return {
      buckets: undefined,
      selected_bucket_id: undefined,
      error: false
    }
  },

  componentDidUpdate(prevProps, prevState) {
    console.log('match', this.state === prevState )
    console.log('state', JSON.stringify(this.state, null, 4))
  },

  componentDidMount() {

    if (UserStore.isUserLoggedIn()) {

      // load the buckets
      loadBuckets()
      .then( (buckets) => this.setState({ buckets: buckets }) )
      .catch( (err) => this.setState({ error: err }))

      // subscribe to future changes
      this.token = BucketStore.addListener(this.handleBucketsChanged)

    }
  },

  componentWillUnmount() {
    if (this.token) {
      this.token.remove()
    }
  },

  handleNewBucket(event) {
    createBucket()
    .then( result => {
      console.log('createdBucket with', result)
      this.props.history.push('/buckets/' + result.id + '/settings')
    })
    .catch( err => this.setState( { error: err } ))
  },

  handleBucketsChanged() {
    this.setState({
      buckets: BucketStore.getBuckets()
    })
  },

  handleSelect(bucket) {
    console.log('bucket settings click', bucket)
    this.props.history.push('/buckets/' + bucket.id + '/settings')
  },
  render() {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Buckets</h1>
            <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
              {this.state.error ? this.state.error.message : ''}
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="callout">
            <button onClick={this.handleNewBucket}><FontAwesome name='plus' /> New Bucket</button>
            <p>You are using 3 out of 5 available active buckets in <Link to="account/billing">your plan</Link>.</p>
          </div>
        <BucketTable buckets={this.state.buckets}
          selected_bucket_id={this.state.selected_bucket_id}
          select={this.handleSelect}
          show={(bucket) => {
            console.log('show submissions click', bucket)
            this.props.history.push('/buckets/' + bucket.id + '/submissions')

            // this.setState({ selected_bucket_id: bucket.id })
            // this.setState({ selected_bucket: bucket })
            // this.setState({ submissions: undefined })
            // loadSubmissionsByBucket(bucket.id, 0, 50) // load first 50 submissions
          }}/>
      </div>
    </div>
  )
}
})

export default Buckets
