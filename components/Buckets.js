/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import { route } from "preact-router";
import "./styles/bucketlist.scss";
import IF from "formula/src/branch";
import ISBLANK from "formula/src/isblank";
import EQ from "formula/src/eq";

function setState(props) {
  dispatch("changeBuckets", props);
}

let BucketList = props => {
  if (ISBLANK(props.buckets)) {
    return <div>Loading Buckets...</div>;
  }

  if (props.buckets.length == 0) {
    return (
      <div>You have no buckets. There was never a better time to make one!</div>
    );
  }

  return (
    <ul class="bucket-list">
      {props.buckets.map(bucket => (
        <li key={bucket.id}>
          <div class="bucket-item">
            <div class="bucket-meta" onClick={() => props.select(bucket)}>
              <h3>
                <i
                  class={
                    "fa toggle-switch fa-" +
                    IF(bucket.enabled, "toggle-on", "toggle-off")
                  }
                />
                <span>{IF(ISBLANK(bucket.name), bucket.id, bucket.name)}</span>
              </h3>
            </div>
            <div class="submission-count">
              <button class="secondary" onClick={() => props.show(bucket)}>
                {bucket.submissions ? bucket.submissions.totalCount : "?"}{" "}
                Submissions <i class="fa fa-chevron-right" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

class Buckets extends Component {
  state = {
    mode: "list",
    buckets: undefined,
    selected_bucket_id: undefined,
    error: false
  };

  handleSelect = bucket => {
    route("/buckets/" + bucket.id + "/settings");
  };

  handleShow = bucket => {
    route(`/buckets/${bucket.id}/submissions/list/0/50/data,created_on`);
    return false;
  };

  render() {
    let { buckets } = this.props || {};
    let state = this.props;

    if (!buckets) return null;

    let Buckets = (
      <BucketList
        buckets={buckets}
        selected_bucket_id={state.selected_bucket_id}
        select={this.handleSelect}
        show={this.handleShow}
      />
    );

    return (
      <div>
        <div class="wrapper">
          <div class="callout">
            <p>Buckets store your form data.</p>
            <button onClick={() => this.props.createBucket()}>
              <i class="fa fa-plus" /> Create Bucket
            </button>
          </div>
          <div
            style={{
              padding: 10,
              marginBottom: 10,
              background: "red",
              color: "white",
              display: state.error ? "" : "none"
            }}
          >
            {state.error ? state.error.message : ""}
          </div>
          {state.error ? undefined : Buckets}
        </div>
      </div>
    );
  }
}

export default Buckets;
