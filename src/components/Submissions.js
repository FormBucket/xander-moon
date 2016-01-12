import React, { PropTypes } from 'react'
import {COND, NOT, EQ, OR, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadBucket, loadSubmissionsByBucket} from '../stores/ActionCreator'
import BucketStore from '../stores/buckets'
import SubmissionsStore from '../stores/Submissions'
import FontAwesome from 'react-fontawesome'
import {getQueryParam} from '../stores/webutils'

function wrap(output) {
  return (
    <div>
      <div className="page-heading">
        <div className="wrapper">
          <h1>Submissions</h1>
        </div>
      </div>
      <div className="wrapper">
        {output}
      </div>
    </div>
  )
}

const Submissions = React.createClass({
  getInitialState () {
    console.log(+getQueryParam('l'), +getQueryParam('o'), getQueryParam('s'), getQueryParam('m'))
    var initialState = {
      mode: getQueryParam('m') || getQueryParam('mode') || 'list',
      submissions: undefined,
      loaded: false,
      loading: false,
      offset: ( +getQueryParam('o')  || +getQueryParam('offset') || 0),
      limit: ( +getQueryParam('l') || +getQueryParam('limit') || 50),
      select: ( getQueryParam('s') || getQueryParam('select') || 'created_on,data' ),
      canGoBack: false,
      canGoForward: true
    }
    console.log(initialState)
    return initialState
  },

  go() {
    this.props.history.push(`/buckets/${this.props.params.id}/submissions?s=${this.state.select}&m=${this.state.mode}&l=${this.state.limit}&o=${this.state.offset}`)
  },
  
  componentDidUpdate(prevProps, prevState) {
    console.log('match', this.state === prevState, this.state, prevState )

      if (this.state !== prevState) {
        this.go()
      }
  },

  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {

      this.setState({ loading: true, bucket_id: this.props.params.id })

      Promise.all([
        loadBucket(this.props.params.id),
        loadSubmissionsByBucket(this.props.params.id, this.state.offset, this.state.limit, this.state.select)
      ])
      .then(values => this.setState({
        loading: false,
        loaded: true,
        bucket: values[0],
        submissions: values[1]
      }))
      .catch(error => this.setState({ error: error }))

      // subscribe to local changes
      // this.token = BucketStore.addListener(this.handleBucketsChanged)
      // this.token2 = SubmissionsStore.addListener(this.handleSubmissionsChanged)

    }
  },
  componentWillUnmount() {
    if (this.token) {
      this.token.remove()
    }

    if (this.token2) {
      this.token2.remove()
    }
  },

  handleBucketsChanged: function() {
    console.log('handleSubmissionsChanged', this.state.bucket_id, BucketStore.find(this.state.bucket_id))
    this.setState( {
      bucket: BucketStore.find(this.state.bucket_id)
    })
  },

  handleSubmissionsChanged: function() {
    console.log('handleSubmissionsChanged', this.props.params.id, SubmissionsStore.getSubmissions())
    this.setState( {
      submissions: SubmissionsStore.getSubmissions()
    })
  },

  goForward (event) {
    if (this.state.loading) {
      return
    }
    console.log('goForward')
    var newOffset = COND(
      this.state.offset + this.state.limit <= this.state.bucket.submission_count,
      this.state.offset + this.state.limit,
      this.state.offset
    )

    console.log('test', this.state.offset, this.state.limit, this.state.bucket.submission_count)

    if (this.state.offset === newOffset) {
      //console.log('fail1')
      return
    }

    if (newOffset >= this.state.bucket.submission_count) {
      //console.log('fail2')
      return
    }

    console.log('do it', newOffset, this.state.offset, this.state.limit, this.state.bucket.submission_count)
    
    this.setState({ loading: true })
    loadSubmissionsByBucket(
      this.props.params.id,
      newOffset,
      this.state.limit,
      this.state.select
    )
    .then(submissions => {
      this.setState({
        loading: false,
        offset: newOffset,
        submissions: submissions,
        can_go_back: true, 
        can_go_forward: (newOffset + this.state.limit) < this.state.bucket.submission_count
      })
    })
    .catch(error => this.setState({ error: error }))

  },

  goBack (event) {

    if (this.state.loading) {
      return
    }

    console.log('goBack')
    var newOffset = COND(
      this.state.offset - this.state.limit > 0,
      this.state.offset - this.state.limit,
      0
    )

    if (OR(
      this.state.offset === newOffset,
      this.state.offset >= this.state.bucket.submission_count) ) {
      return
    }

    this.setState({ loading: true })
    loadSubmissionsByBucket(
      this.props.params.id,
      newOffset,
      this.state.limit,
      this.state.select
    )
    .then(submissions => {
      this.setState({
        loading: false,
        offset: newOffset,
        submissions: submissions,
        can_go_forward: true,
        can_go_back: newOffset > 0
      })
    })
    .catch(error => this.setState({ error: error }))

  },
  render () {

    console.log('render', this.state )

    if (EQ(this.state.loaded, false)) {
      return (
        <div>Loading...</div>
      )
    }

    if (ISBLANK(this.props.params.id)) {
      return (
        <div>ERROR: No bucket selected!</div>
      )
    }

    if (ISBLANK(this.state.bucket)) {
      return (
        <div>ERROR: Cannot find bucket!</div>
      )
    }

    if (ISBLANK(this.state.submissions)) {
      return (
        <div>Loading...</div>
      )
    }

    if (EQ(this.state.submissions.length, 0)) {
      return (
        <div>No Submissions Yet!</div>
      )
    }

    let pager = (
      <span style={{float:'right' }}>
        Format: &nbsp;
        <a onClick={() => this.setState({mode: 'list'})}>List</a> { ' | ' }
        <a onClick={() => this.setState({mode: 'table'})}>Table</a>{ ' | ' }
        <a onClick={() => this.setState({mode: 'json'})}>JSON</a>&nbsp;&nbsp;&nbsp;&nbsp;

        {this.state.offset+1}-{this.state.offset+this.state.limit < this.state.bucket.submission_count ? this.state.offset + this.state.limit : this.state.bucket.submission_count} of {this.state.bucket.submission_count}&nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={this.goBack}>
          <FontAwesome style={{ cursor: this.state.can_go_back ? 'pointer' : '', fontSize: '1.5em', backgroundColor: 'white', color: this.state.can_go_back ? '#000' : '#666', padding: 5 }} name="chevron-left" />
        </span>
        &nbsp;
        <span onClick={this.goForward} >
          <FontAwesome style={{ cursor: this.state.can_go_forward ? 'pointer' : '', fontSize: '1.5em', backgroundColor: 'white', color: this.state.can_go_forward ? '#000' : '#666', padding: 5 }} name="chevron-right" />
        </span>
        {
          COND( this.state.loading,
                <span style={{ background: 'white', color: '#333', float: 'right', position: 'absolute', right: 40, zIndex: 9999 }}>
                  <FontAwesome name="spinner" /> Loading...
                </span>, null)
        }
      </span>
    )

    if (EQ(this.state.mode, 'list')) {
      return wrap(
        <div>
          <div style={{ padding: 25, background: '#666', color: 'white' }}>
            {this.state.bucket.name}
            {pager}
          </div>
          {this.state.submissions.map( (submission, i) => (
            <div style={{border: '1px solid black', margin: 10, background: 'white'}} key={i}>
              <div>
                <span>{submission.created_on.substring(0, 16).replace('T', ' at ')}</span>
              </div>
              {Object.keys(submission.data).map( (key, j) => (
                <div key={i + '|' + j}>
                  <strong>{key}</strong>
                  <span>: {submission.data[key].toString()}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    if (EQ(this.state.mode, 'table')) {
      return wrap(
        <div>
          Do the table mode
          {pager}
        </div>
      )
    }

    if (EQ(this.state.mode, 'json')) {
      return wrap(
        <table className="bucket-list">
          <thead>
            <tr>
              <th>
                { this.state.bucket.name }

                {pager}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.submissions.map( (submission, i) => (
              <tr key={i} style={{marginBottom: 10, borderBottom: '1px solid black' }}>
                <td>
                  <Markdown
                    source={ '```JSON\n' + JSON.stringify(submission, null, 4) + '\n```' }
                    options={ markdownOptions }>
                  </Markdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }

    return (
      <div>Huh, unsupported mode.</div>
    )
  }
})

export default Submissions
