import React, { PropTypes } from 'react'
import {COND, NOT, EQ, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {loadSubmissionsByBucket} from '../stores/ActionCreator'
import SubmissionsStore from '../stores/Submissions'

const Submissions = React.createClass({
  getInitialState () {
    return {
      mode: 'json',
      submissions: undefined
    }
  },
  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      var submissions = SubmissionsStore.getSubmissionsByBucket(this.props.params.id)

      if (submissions && submissions.length > 0) {
        this.setState({ submissions: submissions })
        return
      }

      var bucket = BucketStore.find(this.props.params.id)

      if (bucket) {
        this.setState( { bucket: bucket } ) )
        loadSubmissionsByBucket(this.props.params.id, 0, 50)
      }

      this.token = SubmissionsStore.addListener(this.handleSubmissionsChanged)
      console.log('load bucket and submissions for', this.props.params.id)
      loadBucket(this.props.params.id, (err, bucket) => {
        if (err) {
          alert('Error loading...')
          this.setState( { error: err } )

        }
        this.setState( { bucket: bucket } ) )
        loadSubmissionsByBucket(this.props.params.id, 0, 50)
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
    this.setState({
      submissions: COND(
        ISBLANK(this.props.params.id),
        [],
        SubmissionsStore.getSubmissionsByBucket(this.props.params.id)
      )
    })
  },
  render () {

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

    if (EQ(this.state.mode, 'list')) {
      return (
        <div>Do the list mode</div>
      )
    }

    if (EQ(this.state.mode, 'table')) {
      return (
        <div>Do the table mode</div>
      )
    }

    if (EQ(this.state.mode, 'json')) {
      return (
        <table className="bucket-list">
          <thead>
            <tr>
              <th>Submissions for {bucket.name}</th>
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
