import React, { PropTypes } from 'react'
import {COND, NOT, EQ, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadBucket, loadSubmissionsByBucket} from '../stores/ActionCreator'
import SubmissionsStore from '../stores/Submissions'
import FontAwesome from 'react-fontawesome'

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
      mode: 'list',
      submissions: undefined,
      loaded: false,
      loading: false,
      offset: 0,
      limit: 10
    }
  },
  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      this.token = SubmissionsStore.addListener(this.handleSubmissionsChanged)

      var bucket = BucketStore.find(this.props.params.id)

      if (bucket) {

        console.log('found', bucket)
        this.setState( { bucket: bucket } )

        // var submissions = SubmissionsStore.getSubmissionsByBucket(this.props.params.id)
        //
        // if (submissions && submissions.length > 0) {
        //   this.setState({ loaded: true, submissions: submissions })
        //   return
        // }

        this.setState({ loading: true })
        loadSubmissionsByBucket(this.props.params.id, 0, 50, (err, submissions) => {
          if (err) {
            console.log(err)
            alert('Error occurred')
            return
          }

          this.setState({ loading: false, loaded: true, submissions: submissions })
          return

        })

      }


      console.log('load bucket and submissions for', this.props.params.id)
      this.setState({ loading: true })
      loadBucket(this.props.params.id, (err, bucket) => {

        if (err) {
          alert('Error loading...')
          this.setState( { error: err } )
          return
        }

        this.setState( { bucket: bucket } )
        loadSubmissionsByBucket(this.props.params.id, 0, 50, (err, submissions) => {
          if (err) {
            console.log(err)
            alert('Error occurred')
            return
          }

          this.setState({ loading: false, loaded: true, submissions: submissions })

        })
      })
    }
  },
  componentWillUnmount() {
    if (this.token) {
      this.token.remove()
    }
  },
  handleSubmissionsChanged: function() {
    console.log('handleSubmissionsChanged', this.props.params.id, SubmissionsStore.getState())
    // this.setState({
    //   loaded: true,
    //   submissions: COND(
    //     ISBLANK(this.props.params.id),
    //     [],
    //     SubmissionsStore.getSubmissionsByBucket(this.props.params.id, this.state.offset, this.state.limit)
    //   )
    // })
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

    if (this.state.offset === newOffset) {
      returned
    }

    this.setState({ loading: true })
    loadSubmissionsByBucket(
      this.props.params.id,
      newOffset,
      this.state.limit,
      (err, submissions) => {
        if (err) {
          console.log(err)
          alert('Error occurred')
          return
        }

        console.log('change offset', newOffset)
        this.setState({ offset: newOffset, loading: false, loaded: true, submissions: submissions })
      }
    )

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

    if (this.state.offset === newOffset) {
      returned
    }

    this.setState({ loading: true })
    loadSubmissionsByBucket(
      this.props.params.id,
      newOffset,
      this.state.limit,
      (err, submissions) => {

        if (err) {
          console.log(err)
          alert('Error occurred')
          return
        }

        console.log('change offset', newOffset)
        this.setState({ offset: newOffset, loading: false, loaded: true, submissions: submissions })

      }
    )

  },
  render () {

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
        Export: &nbsp;
        <a href="#">CSV </a> { ' | ' }
        <a href="#">JSON</a>&nbsp;&nbsp;&nbsp;&nbsp;

        Format: &nbsp;
        <a onClick={() => this.setState({mode: 'list'})}>List</a> { ' | ' }
        <a onClick={() => this.setState({mode: 'table'})}>Table</a>{ ' | ' }
        <a onClick={() => this.setState({mode: 'json'})}>JSON</a>&nbsp;&nbsp;&nbsp;&nbsp;

        {this.state.offset+1}-{this.state.offset+this.state.limit < this.state.bucket.submission_count ? this.state.offset+this.state.limit+1 : this.state.bucket.submission_count} of {this.state.bucket.submission_count}&nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={this.goBack}>
          <FontAwesome style={{ cursor: 'pointer', fontSize: '1.5em', backgroundColor: 'white', color: 'black', padding: 5 }} name="chevron-left" />
        </span>
        &nbsp;
        <span onClick={this.goForward} >
          <FontAwesome style={{ cursor: 'pointer', fontSize: '1.5em', backgroundColor: 'white', color: 'black', padding: 5 }} name="chevron-right" />
        </span>
        <span style={{ display: COND(this.state.loading, '', 'none'), background: 'white', color: 'red', float: 'right', position: 'absolute', right: 40, zIndex: 9999 }}>
          Loading...
        </span>
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
            <div style={{border: '1px solid black', margin: 10, background: 'white'}} key={submission.id}>
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
