/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import format from "date-fns/format";
import { route } from 'preact-router';

class Notifications extends Component {
  handleChange(newOffset, limit, bucket_id) {
    this.props.loadNotifications(newOffset, limit, bucket_id);
    route(`/notifications?offset=${newOffset}&limit=${limit}&bucket_id=${bucket_id}`)
  }
  render() {

    let {bucket, bucket_id, offset, limit, items = [], total_count } = this.props;
    offset = +offset;
    limit = +limit;

    console.log('render', this);
    if (items === null) return <div>Loading...</div>;
    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>
              Notifications
              {IF(
                bucket_id,
                <span>
                  {" "}
                  &gt;{" "}
                  {bucket
                    ? bucket.name
                    : bucket_id}
                </span>
              )}
            </h1>
          </div>
        </div>
        <div class="wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Subject</th>
                <th>Sent at</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d, i) => (
                <tr key={i}>
                  <td>{d.completed ? format(d.completed, "MMM DD, YYYY hh:mm a") : "N/A"}</td>
                  <td>{d.campaign}</td>
                  <td>{d.from}</td>
                  <td>{d.to}</td>
                  <td>{d.subject}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
          <button
            disabled={offset == 0}
            onClick={() => this.handleChange(Math.max(0, offset -limit), limit, bucket_id)}
          >
            Back
          </button>{" "}
          <button
            disabled={limit+offset > total_count}
            onClick={() => this.handleChange(offset + limit, limit, bucket_id)}
          >Next</button> Showing{" "}
          {+offset + 1} to{" "}
          {+offset +
            1 +
            +items.length}
        </div>
      </div>
    );
  }
}

export default Notifications;
