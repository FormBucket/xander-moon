import {COND, EQ, NOT, ISBLANK} from 'functionfoundry'
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

const Buckets = React.createClass({
  render () {
    if (ISBLANK(this.props.buckets)) {
      return (
        <div>Loading Buckets...</div>
      )
    }

    if (EQ(this.props.buckets.length, 0)) {
      return (
        <div>No Submissions Yet!</div>
      )
    }

    return (
      <table className="bucket-list">
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Submissions</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.buckets.map(bucket => (
              <tr key={bucket.id}>
                <td onClick={() => this.props.select(bucket)} >
                  <h4>
                    <FontAwesome name={COND(bucket.enabled, 'toggle-on', 'toggle-off')} /> {bucket.name}
                    {
                      COND(
                        bucket.email_to,
                        <span> <FontAwesome name="envelope-o" /></span>
                      )
                    }
                  </h4>
                </td>
                <td>
                  <button className="secondary" onClick={ () => this.props.show(bucket) }>{bucket.submission_count} Submissions <FontAwesome name='chevron-right' /></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
})

export default Buckets
