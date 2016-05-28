import React, { PropTypes } from 'react'
import {COND, NOT, EQ, OR, IF, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadBucket, loadSubmissionsByBucket} from '../stores/ActionCreator'
import BucketStore from '../stores/buckets'
import SubmissionsStore from '../stores/submissions'
import FontAwesome from 'react-fontawesome'
import {getQueryParam} from '../stores/webutils'
import DownloadLink from 'react-download-link'

let color = {
  disabled: 'gray',
  enabled: 'purple'
}

function wrap(headingText, output) {
 return (
   <div>
     <div className="page-heading">
       <div className="wrapper">
         <h1>{headingText}</h1>
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

      // console.log('componentWillReceiveProps', this)

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

    window.scrollTo(0, 0)

  },

  handleBucketsChanged: function() {
    // console.log('handleSubmissionsChanged')
    this.setState( {
      bucket: BucketStore.find(this.props.params.id)
    })
  },

  handleSubmissionsChanged: function() {
    // console.log('handleSubmissionsChanged', this.props.params.id, SubmissionsStore.getSubmissions())
    this.setState( {
      submissions: SubmissionsStore.getSubmissions()
    })
  },

  goForward (event) {
    var offset = +this.props.params.offset,
    limit = +this.props.params.limit

    if (this.state.loading) {
      return
    }
    // console.log('goForward')
    var newOffset = COND(
      offset + limit <= this.state.bucket.submission_count,
      offset + limit,
      offset
    )

    if (offset === newOffset || newOffset >= this.state.bucket.submission_count) {
      return
    }

    this.props.history.push(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${newOffset}/${limit}/${this.props.params.select}`)
  },

  goBack (event) {

    var offset = +this.props.params.offset,
    limit = +this.props.params.limit

    if (this.state.loading) {
      return
    }

    // console.log('goBack')
    var newOffset = IF(
      offset - limit > 0,
      offset - limit,
      0
    )

    if (OR(
      offset === newOffset,
      offset >= this.state.bucket.submission_count) ) {
      return
    }

    this.props.history.push(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${newOffset}/${limit}/${this.props.params.select}`)

  },

  render () {

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

    var offset = +this.props.params.offset,
    limit = +this.props.params.limit,
    total = this.state.bucket.submission_count,
    from = offset+1,
    to = IF(offset + limit < total, offset + limit, total),
    headingText = IF(
      this.state.bucket.name && this.state.bucket.name.trim().length > 0,
      this.state.bucket.name,
      this.state.bucket.id
    )

    let pager = (key) => (
      <div key={key}>
        <p className="format">
          <strong>Showing {from}-{to} of {total}</strong>
        </p>
        <div className="pagination">
          <p>
            <button onClick={this.goBack} style={{
                cursor: IF(offset > 0, 'pointer', 'auto'),
                marginRight: '1.5em',
                color: IF(offset > 0, color.enabled, color.disabled),
                borderColor: IF(offset > 0, color.enabled, color.disabled) }}>
              <FontAwesome name="chevron-left" /> Prev
            </button>

            <button onClick={this.goForward} style={{
                cursor: IF(to < total, 'pointer', 'auto'),
                color: IF(offset + limit < total, color.enabled, color.disabled) }}>
              Next <FontAwesome name="chevron-right" />
            </button>
            {'    '}

            {/*<DownloadLink
            filename={`${headingText}-${from}-${to}.json`}
            label="Save"
            export={() => {
              return JSON.stringify(SubmissionsStore.getState(), null, 4)
            }}/>

            <DownloadLink
            filename={`${headingText}.json`}
            label="Export"
            export={() => {
              return exportSubmissionsByBucket('grXT623', 'json')
            }}/>*/}


          </p>
          {
            IF( this.state.loading,
                <span style={{
                    background: 'white',
                    color: '#333',
                    float: 'right',
                    position: 'absolute',
                    right: 200,
                    zIndex: 9999 }}>
                  <FontAwesome name="spinner" /> Loading...
                </span>, null)
          }
        </div>
      </div>
    )


    // console.log(this.props.params.mode)

    if (EQ(this.props.params.mode, 'list')) {
      return wrap(headingText,
        <div>
          <div className="callout-controls">
            {pager('top')}
          </div>
          <ul className="bucket-list">
            {this.state.submissions.map( (submission, i) => (
              <li key={submission.id} >
                <div className="bucket-item" key={i}>
                  <span>Submitted {submission.created_on.substring(0, 16).replace('T', ' at ')}</span>
                  {Object.keys(submission.data).map( (key, j) => (
                    <div key={i + '|' + j}>
                      <strong>{key}</strong>
                      <span>: {submission.data[key].toString()}</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="callout-controls">
            {pager('bottom')}
          </div>
        </div>
      )
    }

    if (EQ(this.props.params.mode, 'table')) {
      return wrap(headingText,
        <div>
          Do the table mode
          {pager}
        </div>
      )
    }

    if (EQ(this.props.params.mode, 'json')) {
      return wrap(headingText,
        <table className="bucket-list">
          <thead>
            <tr>
              <th>
                { this.state.bucket.name }

                {pager('top')}
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
