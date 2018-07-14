/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { IF } from "formula";
import UserStore from "../stores/user";
import moment from "moment";
import { requestEmailQueue } from "../stores/webutils";
import Layout from "./Layout";

import { Link, router } from "xander";

class UserReport extends React.Component {
  state = {
    submissions: undefined,
    loaded: false,
    loading: false
  };

  componentWillMount() {
    let { offset, limit } = this.props.router.location.query;
    if (!offset) {
      router.redirect("/notifications?offset=0&limit=10");
    }
  }

  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      let { offset, limit, bucket_id } = this.props.router.location.query;
      requestEmailQueue(offset, limit, bucket_id)
        .then(({ items }) =>
          this.setState({
            currentOffset: offset,
            loading: false,
            loaded: true,
            records: items
          })
        )
        .catch(error => this.setState({ error: error }));
    }
  }

  handleLoadBack() {
    this.setState({ loadingMore: true, currentOffset: this.state.offset });
    let { limit, offset, bucket_id } = this.props.router.location.query;
    let newOffset = +offset - +limit;
    requestEmailQueue(newOffset, limit, bucket_id)
      .then(result => {
        this.setState({
          currentOffset: newOffset,
          loadingMore: false,
          records: result.items
        });
        router.redirect(
          "/notifications?offset=" +
            newOffset +
            "&limit=" +
            limit +
            (bucket_id ? `&bucket_id=${bucket_id}` : "")
        );
      })
      .catch(error => this.setState({ error: error }));
  }

  handleLoadNext() {
    this.setState({ loadingMore: true, currentOffset: this.state.offset });
    let { limit, offset, bucket_id } = this.props.router.location.query;
    let newOffset = +offset + +limit;
    requestEmailQueue(newOffset, limit, bucket_id)
      .then(result => {
        this.setState({
          currentOffset: newOffset,
          loadingMore: false,
          records: result.items
        });
        router.redirect(
          "/notifications?offset=" +
            newOffset +
            "&limit=" +
            limit +
            (bucket_id ? `&bucket_id=${bucket_id}` : "")
        );
      })
      .catch(error => this.setState({ error: error }));
  }

  render() {
    if (this.state.loaded === false) {
      return (
        <Layout className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      );
    }

    let bucket,
      { bucket_id } = this.props.router.location.query;

    if (bucket_id) {
      bucket = this.props.buckets.byid[bucket_id][0];
    }
    status;

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>
              Notifications
              {IF(
                this.props.router.location.query.bucket_id,
                <span>
                  {" "}
                  &gt;{" "}
                  {bucket
                    ? bucket.name
                    : this.props.router.location.query.bucket_id}
                </span>
              )}
            </h1>
          </div>
        </div>
        <div className="wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Sent at</th>
                <th>Status</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {this.state.records.map((d, i) => (
                <tr key={i}>
                  <td>{moment(d.completed).format("MMM DD, YYYY hh:mm a")}</td>
                  <td>
                    {IF(
                      d.status === 0,
                      "Not sent",
                      d.status === 1,
                      "Processing",
                      d.status === 2,
                      "Sent",
                      d.status < 0,
                      "Error!"
                    )}
                  </td>
                  <td>{d.campaign}</td>
                  <td>{d.from}</td>
                  <td>{d.to}</td>
                  <td>{d.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            disabled={+this.state.currentOffset == 0}
            onClick={this.handleLoadBack.bind(this)}
          >
            Back
          </button>{" "}
          <button onClick={this.handleLoadNext.bind(this)}>Next</button> Showing{" "}
          {+this.props.router.location.query.offset + 1} to{" "}
          {+this.props.router.location.query.offset +
            1 +
            +this.state.records.length}
        </div>
      </Layout>
    );
  }
}

export default UserReport;
