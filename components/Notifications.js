/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import { route } from "preact-router";

class Notifications extends Component {
  handleChange(newOffset, limit, bucket_id) {
    this.props.loadNotifications(newOffset, limit, bucket_id);
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

    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>
              Notifications
              {IF(
                bucket_id,
                <span> &gt; {bucket ? bucket.name : bucket_id}</span>
              )}
            </h1>
          </div>
        </div>
        <div class="wrapper">
          <div class="div">
            <div>
              {items.map((d, i) => (
                <div
                  style={{ border: "1px black solid", padding: 10, margin: 10 }}
                >
                  <label>
                    Id:
                    <div>{d.id}</div>
                  </label>

                  <label>
                    Created:
                    <div>{d.created_on}</div>
                  </label>

                  <label>
                    Campaign:
                    <div>{d.campaign}</div>
                  </label>

                  <label>
                    From:
                    <div>{d.from}</div>
                  </label>

                  <label>
                    Subject:
                    <div>{d.subject}</div>
                  </label>

                  <label>
                    Status:
                    <div>
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
                    </div>
                  </label>
                  <div />
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={offset == 0}
            onClick={() =>
              this.handleChange(Madiv.max(0, offset - limit), limit, bucket_id)
            }
          >
            Back
          </button>{" "}
          <button
            disabled={limit + offset > total_count}
            onClick={() => this.handleChange(offset + limit, limit, bucket_id)}
          >
            Next
          </button>{" "}
          Showing {+offset + 1} to {+offset + 1 + +items.length}
        </div>
      </div>
    );
  }
}

export default Notifications;
