import React, { PropTypes } from 'react'
import SubmissionsStore from '../stores/Submissions'
import {loadSubmissions, streamSubmissions} from '../stores/ActionCreator'

const Submissions = React.createClass({

  getInitialState: function() {
    return {
      submissions: []
    }
  },

  componentDidMount: function() {
    this.token = SubmissionsStore.addListener(this.handleSubmissionsChanged)
    loadSubmissions(0, 50) // load first 50 submissions
    streamSubmissions();  //
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  handleSubmissionsChanged: function() {
    this.setState({
      submissions: SubmissionsStore.getSubmissions()
    })
  },

  render () {
    return (
      <ul>
        {this.state.submissions.map( (submission, i) => (
          <li key={i} style={{marginBottom: 10, borderBottom: '1px solid black' }}>{JSON.stringify(submission, null, 4)}</li>
        ))}
      </ul>
    )
  }
})

export default Submissions
