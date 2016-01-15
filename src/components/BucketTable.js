import {COND, EQ, NOT, ISBLANK} from 'functionfoundry'
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

const Buckets = React.createClass({
  render () {
    console.log('Hello')
    if (ISBLANK(this.props.buckets)) {
      return (
        <div>Loading Buckets...</div>
      )
    }

    if (EQ(this.props.buckets.length, 0)) {
      return (
        <div>You have no buckets. There was never a better time to make one! Get started now.</div>
      )
    }

    return (
      <table className="bucket-list">
          {
            this.props.buckets.map(bucket => (
              <tr key={bucket.id}>
                <td onClick={() => this.props.select(bucket)} >
                  <FontAwesome name={COND(bucket.enabled, 'toggle-on', 'toggle-off')} />&nbsp;
                  {bucket.name}
                </td>
                <td onClick={() => this.props.select(bucket)} >
                  http://api.formbucket.com/f/{bucket.id}
                  {
                    COND(
                      bucket.email_to,
                      <span> <FontAwesome name="envelope-o" /></span>
                    )
                  }
                </td>
                <td>
                  <button className="secondary" onClick={ () => this.props.show(bucket) }>{bucket.submission_count} Submissions <FontAwesome name='chevron-right' /></button>
                </td>
              </tr>
            ))
          }
      </table>
    )
  }
})

export default Buckets
