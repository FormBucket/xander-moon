import React, { PropTypes } from 'react'
import {NOT, EQ, ISBLANK} from 'functionfoundry'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

const Submissions = React.createClass({
  render () {

    if (ISBLANK(this.props.selected_bucket)) {
      return (
        <div></div>
      )
    }

    if (ISBLANK(this.props.submissions)) {
      return (
        <div>Loading...</div>
      )
    }

    if (EQ(this.props.submissions.length, 0)) {
      return (
        <div>No Submissions Yet!</div>
      )
    }

    return (
      <table className="bucket-list">
        <thead>
          <tr>
            <th>Submissions for {this.props.selected_bucket.name}</th>
          </tr>
        </thead>
        <tbody>
        {this.props.submissions.map( (submission, i) => (
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
})

export default Submissions
