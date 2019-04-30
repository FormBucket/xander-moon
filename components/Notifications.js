/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import { route } from "preact-router";

let Paging = ({
  handleChange,
  offset,
  limit,
  bucket_id,
  items,
  total_count
}) => (
  <div style={{ marginTop: 20, marginBottom: 20 }}>
    <button
      disabled={offset == 0}
      onClick={() =>
        handleChange(Math.max(0, offset - limit), limit, bucket_id)
      }
    >
      Back
    </button>{" "}
    <button
      disabled={limit + offset > total_count}
      onClick={() => handleChange(offset + limit, limit, bucket_id)}
    >
      Next
    </button>{" "}
    Showing {+offset + 1} to {+offset + 1 + +items.length}
  </div>
);

let loadNotifications;
class Notifications extends Component {
  componentWillMount() {
    loadNotifications = this.props.loadNotifications;
  }
  handleChange(newOffset, limit, bucket_id) {
    loadNotifications(newOffset, limit, bucket_id);
    route(
      `/notifications?offset=${newOffset}&limit=${limit}&bucket_id=${bucket_id}`
    );
  }
  render() {
    let { bucket_id, offset, limit } = this.props;
    let { bucket } = this.props;

    if (!bucket) return <div>Loading...</div>;
    if (!bucket.notifications) return <div>Loading...</div>;

    let items = bucket.notifications.nodes;
    let total_count = bucket.notifications.totalCount;
    offset = +offset;
    limit = +limit;

    if (total_count === 0) {
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
                    &gt; {bucket && bucket.name ? bucket.name : bucket_id}
                  </span>
                )}
              </h1>
            </div>
            <div class="wrapper">Nothing here to see</div>
          </div>
        </div>
      );
    }

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
                  &gt; {bucket && bucket.name ? bucket.name : bucket_id}
                </span>
              )}
            </h1>
          </div>
        </div>
        <div class="wrapper">
          <Paging
            handleChange={this.handleChange}
            offset={offset}
            limit={limit}
            bucket_id={bucket_id}
            total_count={total_count}
            items={items}
          />
          <div class="div">
            <div>
              {items.map((d, i) => (
                <div
                  style={{ border: "1px black solid", padding: 5, margin: 5 }}
                >
                  <label>
                    Id: <span style={{ fontWeight: "normal" }}>{d.id}</span>
                  </label>

                  <label>
                    Created:{" "}
                    <span style={{ fontWeight: "normal" }}>{d.createdOn}</span>
                  </label>

                  <label>
                    Type:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {d.campaign || "Notification"}
                    </span>
                  </label>

                  <label>
                    From: <span style={{ fontWeight: "normal" }}>{d.from}</span>
                  </label>

                  <label>
                    Subject:{" "}
                    <span style={{ fontWeight: "normal" }}>{d.subject}</span>
                  </label>

                  <label>
                    Status:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {IF(
                        !d.status || d.status === 0,
                        "Not sent",
                        d.status === 1,
                        "Processing",
                        d.status === 2,
                        "Sent",
                        d.status < 0,
                        "Error!",
                        "Not sent"
                      )}
                    </span>
                  </label>
                  <div />
                </div>
              ))}
            </div>
          </div>
          <Paging
            handleChange={this.handleChange}
            offset={offset}
            limit={limit}
            bucket_id={bucket_id}
            total_count={total_count}
            items={items}
          />
        </div>
      </div>
    );
  }
}

export default Notifications;
