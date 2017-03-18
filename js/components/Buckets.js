// Author: Peter Moresi
import {branch as COND, not as NOT, isblank as ISBLANK, isfunction as ISFUNCTION, branch as IF} from 'functionfoundry'
import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import FontAwesome from 'react-fontawesome'
import UserStore from '../stores/user'
import {requestBuckets, requestCreateBucket} from '../stores/webutils'
import BucketTable from './BucketTable'
import BucketList from './BucketList'

const Buckets = React.createClass({
  getInitialState() {
    return {
      mode: 'list',
      buckets: undefined,
      selected_bucket_id: undefined,
      error: false,
      user: UserStore.getState()
    }
  },

  componentDidMount() {

    if (!UserStore.isUserLoggedIn()) {
      browserHistory.push('/login')
    }

    // load the buckets
    requestBuckets()
    .then( (buckets) => this.setState({ buckets: buckets }) )
    .catch( (err) => this.setState({ buckets: [], error: err }))

  },

  handleNewBucket(event) {
    requestCreateBucket({ enabled: true })
    .then( result => {
      browserHistory.push('/buckets/' + result.id + '/settings')
    })
    .catch( err => this.setState( { error: err } ))
  },

  handleSelect(bucket) {
    // console.log('bucket settings click', bucket)
    browserHistory.push('/buckets/' + bucket.id + '/settings')
  },

  handleShow(bucket) {
    // console.log('show submissions click', bucket)
    browserHistory.push('/buckets/' + bucket.id + '/submissions')
  },

  render() {

    if ( ISBLANK(this.state.buckets) ) {
      return <div>Loading...</div>
    }

    let Buckets = this.state.mode === 'table' ?
    <BucketTable buckets={this.state.buckets}
      selected_bucket_id={this.state.selected_bucket_id}
      select={this.handleSelect}
      show={this.handleShow}/> :
    <BucketList buckets={this.state.buckets}
      selected_bucket_id={this.state.selected_bucket_id}
      select={this.handleSelect}
      show={this.handleShow}/>


    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Buckets</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="callout">
	           <p>Buckets are a container to store form submissions.</p>
             <button onClick={this.handleNewBucket}><FontAwesome name='plus' /> New Bucket</button>
          </div>
          <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
            {this.state.error ? this.state.error.message : ''}
          </div>
          {this.state.error ? undefined : Buckets}
      </div>
    </div>
  )
}
})

export default Buckets
