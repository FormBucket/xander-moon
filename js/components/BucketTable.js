import {IF, EQ, ISBLANK} from 'formula'
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

class Buckets extends React.Component {
  render() {
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
        <tbody>
          {
            this.props.buckets.map(bucket => (
              <tr key={bucket.id}>
                <td onClick={() => this.props.select(bucket)} >
                  <FontAwesome name={IF(bucket.enabled, 'toggle-on', 'toggle-off')} />&nbsp;
                  { IF( ISBLANK(bucket.name), bucket.id, bucket.name ) }
                </td>
                <td onClick={() => this.props.select(bucket)} >
                  http://api.formbucket.com/f/{bucket.id}
                  {
                    IF(
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
        </tbody>
      </table>
    )
  }
}

export default Buckets
