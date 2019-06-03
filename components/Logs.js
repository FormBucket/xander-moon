/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";
import format from "date-fns/format";
import "./styles/logs.scss";

class Logs extends Component {
  render() {
    let { bucket, logs, bucket_id, matches } = this.props;
    let { limit, offset } = matches;
    if (!logs) return null;

    limit = +limit;
    offset = +offset;

    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>
              Logs
              {IF(
                bucket_id,
                <span> &gt; {bucket ? bucket.name : bucket_id}</span>
              )}
            </h1>
          </div>
        </div>
        <div class="wrapper">
          <table>
            <thead>
              <tr>
                <th>status</th>
                <th width="150">date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((d, i) => (
                <tr key={i}>
                  <td>
                    {d.status}{" "}
                    <a href={`/log/${d.id}`}>
                      {d.method} {d.url}
                    </a>
                  </td>
                  <td>{format(d.ts, "MMM DD, YYYY hh:mm a")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            class={`button`}
            href={`/logs?offset=${offset -
              limit}&limit=10&bucket_id=buk_lNSsGwUsjhTXGDXxnXhpBKd1`}
          >
            Back
          </a>{" "}
          <a
            class={`button`}
            href={`/logs?offset=${offset +
              limit}&limit=10&bucket_id=buk_lNSsGwUsjhTXGDXxnXhpBKd1`}
          >
            Next
          </a>
          {/* {offset + 1} to {offset + limit} */}
        </div>
      </div>
    );
  }
}

export default Logs;
