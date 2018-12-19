/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import { route } from "preact-router";
import FontAwesome from "react-fontawesome";
import BucketTable from "./BucketTable";
import BucketList from "./BucketList";
import "./styles/bucketlist.scss";

function setState(props) {
  dispatch("changeBuckets", props);
}

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
