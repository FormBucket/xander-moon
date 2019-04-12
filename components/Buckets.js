/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import { route } from "preact-router";
import FontAwesome from "react-fontawesome";
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
                <FontAwesome
                  class="toggle-switch"
                  name={IF(bucket.enabled, "toggle-on", "toggle-off")}
                />
                <span>{IF(ISBLANK(bucket.name), bucket.id, bucket.name)}</span>
              </h3>
            </div>
            <div class="submission-count">
              <button class="secondary" onClick={() => props.show(bucket)}>
                {bucket.submissions ? bucket.submissions.totalCount : '?'} Submissions{" "}
                <FontAwesome name="chevron-right" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

let BucketTable = props => {
  if (ISBLANK(props.buckets)) {
    return <div>Loading Buckets...</div>;
  }

  if (EQ(props.buckets.length, 0)) {
    return (
      <div>
        You have no buckets. There was never a better time to make one! Get
        started now.
      </div>
    );
  }

  return (
    <table class="bucket-list">
      <tbody>
        {props.buckets.map(bucket => (
          <tr key={bucket.id}>
            <td onClick={() => props.select(bucket)}>
              <FontAwesome
                name={IF(bucket.enabled, "toggle-on", "toggle-off")}
              />
              &nbsp;
              {IF(ISBLANK(bucket.name), bucket.id, bucket.name)}
            </td>
            <td onClick={() => props.select(bucket)}>
              http://api.formbucket.com/f/{bucket.id}
              {IF(
                bucket.email_to,
                <span>
                  {" "}
                  <FontAwesome name="envelope-o" />
                </span>
              )}
            </td>
            <td>
              <button class="secondary" onClick={() => props.show(bucket)}>
                {bucket.submission_count} Submissions{" "}
                <FontAwesome name="chevron-right" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

    let Buckets =
      state.mode === "table" ? (
        <BucketTable
          buckets={buckets}
          selected_bucket_id={state.selected_bucket_id}
          select={this.handleSelect}
          show={this.handleShow}
        />
      ) : (
        <BucketList
          buckets={buckets}
          selected_bucket_id={state.selected_bucket_id}
          select={this.handleSelect}
          show={this.handleShow}
        />
      );

    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>Buckets</h1>
          </div>
        </div>
        <div class="wrapper">
          <div class="callout">
            <p>Buckets store your form data.</p>
            <button onClick={() => this.props.createBucket()}>
              <FontAwesome name="plus" /> Create Bucket
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
