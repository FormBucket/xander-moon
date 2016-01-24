import React, { PropTypes } from 'react'
import {COND, NOT, EQ, OR, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadBucket, loadSubmissionsByBucket} from '../stores/ActionCreator'
import BucketStore from '../stores/buckets'
import SubmissionsStore from '../stores/Submissions'
import FontAwesome from 'react-fontawesome'
import {getQueryParam} from '../stores/webutils'

let color = {
  disabled: '#BBB',
  enabled: '#000'
}

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
    return {
      submissions: undefined,
      loaded: false,
      loading: false
    }
  },

  componentWillReceiveProps(nextProps) {

    if (UserStore.isUserLoggedIn()) {

      this.setState({ loading: true })

      console.log('componentWillReceiveProps', this)

      Promise.all([
        loadBucket(nextProps.params.id),
        loadSubmissionsByBucket(nextProps.params.id, +nextProps.params.offset, +nextProps.params.limit, nextProps.params.select)
      ])
      .then(values => this.setState({
        loading: false,
        loaded: true,
        bucket: values[0],
        submissions: values[1],
        first_load: false
      }))
      .catch(error => this.setState({ error: error }))

    }
  },

  componentWillMount() {

    this.props.params.mode = this.props.params.mode || 'list'
    this.props.params.limit = (+this.props.params.limit) || 50
    this.props.params.offset = (+this.props.params.offset) || 0
    this.props.params.select = this.props.params.select || 'created_on,data'

    this.props.history.replace(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${this.props.params.offset}/${this.props.params.limit}/${this.props.params.select}`)

  },

  handleBucketsChanged: function() {
    console.log('handleSubmissionsChanged')
    this.setState( {
      bucket: BucketStore.find(this.props.params.id)
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
      +this.props.params.offset + +this.props.params.limit <= this.state.bucket.submission_count,
      +this.props.params.offset + +this.props.params.limit,
      +this.props.params.offset
    )

    // console.log('foo2', this.props.params.offset, newOffset, this.state.submissions.length, this.state.bucket.submission_count)
    if (this.props.params.offset === newOffset ||
      newOffset >= this.state.bucket.submission_count
    ) {
      console.log('goo')
      return
    }

    this.props.history.push(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${newOffset}/${+this.props.params.limit}/${this.props.params.select}`)

  },

  goBack (event) {

    if (this.state.loading) {
      return
    }

    console.log('goBack')
    var newOffset = COND(
      +this.props.params.offset - +this.props.params.limit > 0,
      +this.props.params.offset - +this.props.params.limit,
      0
    )

    if (OR(
      +this.props.params.offset === newOffset,
      +this.props.params.offset >= this.state.bucket.submission_count) ) {
      return
    }

    this.props.history.push(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${newOffset}/${+this.props.params.limit}/${this.props.params.select}`)

  },
  render () {

    console.log('render', this, this.state )

    if (EQ(this.state.loaded, false)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }

    if (ISBLANK(this.props.params.id)) {
      return (
        <div className="wrapper">
          <div className="flash">
            ERROR: No bucket selected!
          </div>
        </div>
      )
    }

    if (ISBLANK(this.state.bucket)) {
      return (
        <div className="wrapper">
          <div className="flash">
            ERROR: Cannot find bucket!
          </div>
        </div>
      )
    }

    if (ISBLANK(this.state.submissions)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }

    if (EQ(this.state.submissions.length, 0)) {
      return (
        <div className="wrapper">
          <div className="flash">
            No Submissions Yet!
          </div>
        </div>
      )
    }

    let pager = (
      <span style={{float:'right' }}>
        Format: &nbsp;
        <a style={{ cursor: 'pointer '}} onClick={() => this.props.history.push(`/buckets/${this.props.params.id}/submissions/list/${this.props.params.offset}/${+this.props.params.limit}/${this.props.params.select}`)}>List</a> { ' | ' }
        <a style={{ cursor: 'pointer '}} onClick={() => this.props.history.push(`/buckets/${this.props.params.id}/submissions/json/${this.props.params.offset}/${+this.props.params.limit}/${this.props.params.select}`)}>JSON</a> { ' | ' }

        {(+this.props.params.offset)+1}-{(+this.props.params.offset) + (+this.props.params.limit) < this.state.bucket.submission_count ? (+this.props.params.offset) + (+this.props.params.limit) : this.state.bucket.submission_count} of {this.state.bucket.submission_count}&nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={this.goBack}>
          <FontAwesome style={{ cursor: (+this.props.params.offset) > 0 ? 'pointer' : '', fontSize: '1.5em', backgroundColor: 'white', color: +this.props.params.offset > 0 ? color.enabled : color.disabled, padding: 5 }} name="chevron-left" />
        </span>
        &nbsp;
        <span onClick={this.goForward} >
          <FontAwesome style={{ cursor: ((+this.props.params.offset) + (+this.props.params.limit)) < this.state.bucket.submission_count ? 'pointer' : '', fontSize: '1.5em', backgroundColor: 'white', color: ((+this.props.params.offset) + (+this.props.params.limit)) < this.state.bucket.submission_count ? color.enabled : color.disabled, padding: 5 }} name="chevron-right" />
        </span>
        {
          COND( this.state.loading,
                <span style={{ background: 'white', color: '#333', float: 'right', position: 'absolute', right: 200, zIndex: 9999 }}>
                  <FontAwesome name="spinner" /> Loading...
                </span>, null)
        }
      </span>
    )

    console.log(this.props.params.mode)

    if (EQ(this.props.params.mode, 'list')) {
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

    if (EQ(this.props.params.mode, 'table')) {
      return wrap(
        <div>
          Do the table mode
          {pager}
        </div>
      )
    }

    if (EQ(this.props.params.mode, 'json')) {
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
