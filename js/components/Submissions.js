import React, { PropTypes } from 'react'
import {branch, eq, or, isBlank} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import {requestBucket, requestSubmissionsByBucket, requestDeleteSubmission, requestDeleteSubmissions, requestUpdateSubmissions, requestUpdateSubmission} from '../stores/webutils'
import UserStore from '../stores/user'
import BucketStore from '../stores/buckets'
import SubmissionsStore from '../stores/submissions'
import FontAwesome from 'react-fontawesome'
//import DownloadLink from 'react-download-link'

let color = {
  disabled: 'gray',
  enabled: 'purple'
}

function wrap(headingText, output) {
 return (
   <div>
     <div className="page-heading">
       <div className="wrapper">
         <h1>{headingText} Submissions</h1>
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
      selected: [],
      loaded: false,
      loading: false
    }
  },

  componentWillMount() {
    if (!UserStore.isUserLoggedIn()) {
      this.props.history.push('/login')
    }
  },

  componentWillReceiveProps(nextProps) {

    this.setState({ loading: true })

    Promise.all([
      requestBucket(nextProps.params.id),
      requestSubmissionsByBucket(nextProps.params.id, +nextProps.params.offset, +nextProps.params.limit, nextProps.params.select, nextProps.location.query.q)
    ])
    .then(values => this.setState({
      loading: false,
      loaded: true,
      bucket: values[0],
      total: values[1].total,
      submissions: values[1].items,
      first_load: false
    }))
    .catch(error => this.setState({ error: error }))

  },

  componentWillMount() {

    this.props.params.mode = this.props.params.mode || 'list'
    this.props.params.limit = (+this.props.params.limit) || 50
    this.props.params.offset = (+this.props.params.offset) || 0
    this.props.params.select = this.props.params.select || 'created_on,data,spam'

    var url = `/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${this.props.params.offset}/${this.props.params.limit}/${this.props.params.select}`

    console.log(this.props)

    if (this.props.location.query.q) {
      this.props.history.replace(url + '?q=' + this.props.location.query.q)
    } else {
      this.props.history.replace(url)
    }

    window.scrollTo(0, 0)

  },

  handleBucketsChanged: function() {
    // console.log('handleSubmissionsChanged')
    this.setState( {
      bucket: BucketStore.find(this.props.params.id)
    })
  },

  handleSubmissionsChanged: function() {
    this.setState( {
      submissions: SubmissionsStore.getSubmissions()
    })
  },

  handleDelete(event, submission) {
    event.stopPropagation()
    requestDeleteSubmission(this.state.bucket.id, submission.id)
    .then(n => this.search())
    .catch(error => alert(error))
    return false
  },

  handleDeleteSelected(){
    requestDeleteSubmissions(this.state.bucket.id, this.state.selected)
    .then(n => this.search())
    .catch(error => alert(error))
  },

  handleMarkSelectedSpam() {
    requestUpdateSubmissions(this.state.bucket.id, this.state.selected, { spam: true })
    .then(n => this.search())
    .catch(error => alert(error))
  },

  handleMarkSpam(event, submission, spam=true) {
    event.stopPropagation()
    requestUpdateSubmission(this.state.bucket.id, submission.id, { spam })
    .then(n => {
      this.setState({
        submissions: this.state.submissions.map(d => branch(d.id === submission.id, Object.assign({}, d, { spam }), d))
      })
    })

  },

  handleSelect(submission) {
    if (this.state.selected.indexOf(submission.id) > -1) {
      this.setState({ selected: this.state.selected.filter(d => d !== submission.id )})
    } else {
      this.setState({ selected: this.state.selected.concat([submission.id])})
    }
  },

  search (event) {
    var url = `/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${this.props.params.offset}/${this.props.params.limit}/${this.props.params.select}?q=${this.refs.q.value}`
    this.props.history.push(url)
  },

  goForward (event) {
    var offset = +this.props.params.offset,
    limit = +this.props.params.limit

    if (this.state.loading) {
      return
    }
    // console.log('goForward')
    var newOffset = branch(
      offset + limit <= this.state.total,
      offset + limit,
      offset
    )

    if (offset === newOffset || newOffset >= this.state.total) {
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
    var newOffset = branch(
      offset - limit > 0,
      offset - limit,
      0
    )

    if (or(
      offset === newOffset,
      offset >= this.state.total) ) {
      return
    }

    this.props.history.push(`/buckets/${this.props.params.id}/submissions/${this.props.params.mode}/${newOffset}/${limit}/${this.props.params.select}`)

  },

  render () {

    console.log(this.state)

    if (eq(this.state.loaded, false)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }

    if (isBlank(this.props.params.id)) {
      return (
        <div className="wrapper">
          <div className="flash">
            ERROR: No bucket selected!
          </div>
        </div>
      )
    }

    if (isBlank(this.state.bucket)) {
      return (
        <div className="wrapper">
          <div className="flash">
            ERROR: Cannot find bucket!
          </div>
        </div>
      )
    }

    if (isBlank(this.state.submissions)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }

    var offset = +this.props.params.offset,
    limit = +this.props.params.limit,
    total = this.state.total,
    from = offset+1,
    to = branch(offset + limit < total, offset + limit, total),
    headingText = branch(
      this.state.bucket.name && this.state.bucket.name.trim().length > 0,
      this.state.bucket.name,
      this.state.bucket.id
    )

    let pager = (key) => (
      <div key={key}>
        <div className="pagination">
          <p>
            <span className="showing-count">Showing {from}-{to} of {total}</span>
            <button className="secondary small" onClick={this.goBack} style={{
              cursor: branch(offset > 0, 'pointer', 'auto'),
              marginRight: '1em',
              color: branch(offset > 0, color.enabled, color.disabled),
              borderColor: branch(offset > 0, color.enabled, color.disabled) }}>
              <FontAwesome name="chevron-left" />
            </button>

            <button className="secondary small" onClick={this.goForward} style={{
              cursor: branch(to < total, 'pointer', 'auto'),
              color: branch(offset + limit < total, color.enabled, color.disabled) }}>
              <FontAwesome name="chevron-right" />
            </button>
            {'    '}
          </p>
          {
            branch( this.state.loading,
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


    // console.log(this.state, this.props)

    if (eq(this.props.params.mode, 'list')) {
      return wrap(headingText,
        <div>
          <div className="submissions-controls">
            <div className="search-bar">
              <input onKeyUp={(e) => branch(event.keyCode === 13, () => this.search())} ref="q" placeholder="Search all submissions..." />
            </div>
            <div className="paging">
              {pager('top')}
            </div>
            <div className="submissions-actions">
              <ul>
                <li><a className="secondary" onClick={() => this.setState({ selected: this.state.submissions.map(d => d.id) })}>Select All</a></li>
                <li><a className="secondary" onClick={() => this.setState({ selected: [] })}>Select None</a></li>
                <li><a className="secondary" onClick={this.handleDeleteSelected}>Delete Selected</a></li>
                <li><a className="secondary" onClick={this.handleMarkSelectedSpam}>Mark Spam</a></li>
              </ul>
            </div>
          </div>
          <ul className="bucket-list">
            {this.state.submissions.map( (submission, i) => (
              <li key={submission.id} onClick={() => this.handleSelect(submission)} >
                <div className="bucket-item" style={{ backgroundColor: branch(this.state.selected.indexOf(submission.id) > -1, 'pink' : '')}} key={i}>
                  <span>Submitted {submission.created_on.substring(0, 16).replace('T', ' at ')}</span>
                  {Object.keys(submission.data).map( (key, j) => (
                    <div key={i + '|' + j}>
                      <strong>{key}</strong>
                      <span>: {submission.data[key].toString()}</span>
                    </div>
                  ))}
                  <button className="secondary" onClick={(e) => this.handleDelete(e, submission)}>Delete</button><br/><br/>
                  { branch(submission.spam, <button className="secondary" onClick={(e) => this.handleMarkSpam(e, submission, false)}><FontAwesome name="smile-o" /> Not spam</button>, <button className="secondary" onClick={(e) => this.handleMarkSpam(e, submission)}><FontAwesome name="frown-o" /> spam</button>)}
                  {' '}{submission.id}
                </div>
              </li>
            ))}
          </ul>
          <div>
            {pager('bottom')}
          </div>
        </div>
      )
    }

    if (eq(this.props.params.mode, 'table')) {
      return wrap(headingText,
        <div>
          Do the table mode
          {pager}
        </div>
      )
    }

    if (eq(this.props.params.mode, 'json')) {
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
