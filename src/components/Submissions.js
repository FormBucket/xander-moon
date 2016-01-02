import React, { PropTypes } from 'react'
import SubmissionsStore from '../stores/Submissions'
import {streamSubmissions, stopSubmissionStream} from '../stores/ActionCreator'

const Submissions = React.createClass({

  getInitialState: function() {
    return {
      submissions: []
    }
  },

  componentDidMount: function() {
    this.token = SubmissionsStore.addListener(this.handleSubmissionsChanged)
    streamSubmissions();
  },

  componentWillUnmount: function() {
    this.token.remove();
    stopSubmissionStream();
  },

  handleSubmissionsChanged: function() {
    this.setState({
      submissions: SubmissionsStore.getSubmissions()
    })
  },

  render () {
    return (
      <ul>
        {this.state.submissions.map( submission => (
          <li style={{marginBottom: 10, borderBottom: '1px solid black' }}>{JSON.stringify(submission, null, 4)}</li>
        ))}
      </ul>
    )
  }
})

export default Submissions
