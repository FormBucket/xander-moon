/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import IF from "formula/src/branch";
import ISBLANK from "formula/src/isblank";
import { h, Component } from "preact";
import FontAwesome from "react-fontawesome";

class Buckets extends Component {
  render() {
    if (ISBLANK(this.props.buckets)) {
      return <div>Loading Buckets...</div>;
    }

    if (this.props.buckets.length == 0) {
      return (
        <div>
          You have no buckets. There was never a better time to make one!
        </div>
      );
    }

    return (
      <ul class="bucket-list">
        {this.props.buckets.map(bucket => (
          <li key={bucket.id}>
            <div class="bucket-item">
              <div
                class="bucket-meta"
                onClick={() => this.props.select(bucket)}
              >
                <h3>
                  <FontAwesome
                    class="toggle-switch"
                    name={IF(bucket.enabled, "toggle-on", "toggle-off")}
                  />
                  <span>
                    {IF(ISBLANK(bucket.name), bucket.id, bucket.name)}
                  </span>
                </h3>
              </div>
              <div class="submission-count">
                <button
                  class="secondary"
                  onClick={() => this.props.show(bucket)}
                >
                  {bucket.submission_count} Submissions{" "}
                  <FontAwesome name="chevron-right" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Buckets;
