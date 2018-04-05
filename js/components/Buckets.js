/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import { router, dispatch, createStore, Link } from "xander";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";
import FontAwesome from "react-fontawesome";
import UserStore from "../stores/user";
import { requestBuckets, requestCreateBucket } from "../stores/webutils";
import BucketTable from "./BucketTable";
import BucketList from "./BucketList";
import Layout from "./Layout";

import BucketsStore from "../stores/buckets";

function setState(props) {
  dispatch("changeBuckets", props);
}
class Buckets extends React.Component {
  state = {
    mode: "list",
    buckets: undefined,
    selected_bucket_id: undefined,
    error: false,
    user: UserStore.getState()
  };

  componentDidMount() {
    dispatch("initBuckets");
    if (!UserStore.isUserLoggedIn()) {
      router.open("/login");
    }

    // load the buckets
    requestBuckets()
      .then(buckets => dispatch("load Buckets", buckets))
      .catch(err => setState({ error: err }));
  }

  handleNewBucket = event => {
    requestCreateBucket({ enabled: true })
      .then(result => {
        router.open("/buckets/" + result.id + "/settings");
      })
      .catch(err => setState({ error: err }));
  };

  handleSelect = bucket => {
    // console.log('bucket settings click', bucket)
    // if ( false && user.isOwner(bucket)){
    // router.open('/buckets/' + bucket.id + '/settings')
    // } else {
    router.open("/buckets/" + bucket.id + "/submissions");
    // }
  };

  handleShow = bucket => {
    // console.log('show submissions click', bucket)
    router.open("/buckets/" + bucket.id + "/submissions");
  };

  render() {
    let state = this.props.buckets || {};

    if (state.loading) {
      return (
        <Layout className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      );
    }

    let Buckets =
      state.mode === "table" ? (
        <BucketTable
          buckets={state.buckets}
          selected_bucket_id={state.selected_bucket_id}
          select={this.handleSelect}
          show={this.handleShow}
        />
      ) : (
        <BucketList
          buckets={state.buckets}
          selected_bucket_id={state.selected_bucket_id}
          select={this.handleSelect}
          show={this.handleShow}
        />
      );

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Buckets</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="callout">
            <p>Buckets are a container to store form submissions.</p>
            <button onClick={this.handleNewBucket}>
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
      </Layout>
    );
  }
}

export default Buckets;
