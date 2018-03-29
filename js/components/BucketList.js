import {IF, ISBLANK} from 'formula'
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

class Buckets extends React.Component {
  render() {
    if (ISBLANK(this.props.buckets)) {
      return (
        <div>Loading Buckets...</div>
      )
    }

    if (this.props.buckets.length == 0) {
      return (
        <div>You have no buckets. There was never a better time to make one!</div>
      )
    }

    return (
      <ul className="bucket-list">
          {
            this.props.buckets.map(bucket => (
              <li key={bucket.id} >
                <div className="bucket-item">
                  <div className="bucket-meta">
                    <h3 onClick={() => this.props.select(bucket)}>
                      <FontAwesome className="toggle-switch" name={IF(bucket.enabled, 'toggle-on', 'toggle-off')} />
                      <span>
                        { IF( ISBLANK(bucket.name), bucket.id, bucket.name ) }
                      </span>
                    </h3>
                  </div>
                  <div className="submission-count">
                    <button className="secondary" onClick={ () => this.props.show(bucket) }>{bucket.submission_count} Submissions <FontAwesome name='chevron-right' /></button>
                  </div>
                </div>
              </li>
            ))
          }
      </ul>
    )
  }
}

export default Buckets
