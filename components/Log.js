/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import format from "date-fns/format";
import "highlight.js/styles/github.css";

class Log extends Component {
  render() {
    var { log } = this.props;

    if (!log) return null;

    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>Log > {log.id}</h1>
          </div>
        </div>
        <div class="wrapper">
          <div>
            <label>Date</label>
            <div>{format(log.ts)}</div>
            <label>url</label>
            <div>{log.url}</div>
            <label>Status</label>
            <div>{log.status}</div>
            <label>IP Address</label>
            <div>{log.ip}</div>
            <label>API Version</label>
            <div>{log.version}</div>
            <label>Request Body</label>
            <div style={{ backgroundColor: "#EEE" }}>
              <pre>
                <code class="language-js">{JSON.stringify(log.requestBody, null, 4)}</code>
              </pre>
            </div>
            <label>Response Body</label>
            <div style={{ backgroundColor: "#EEE" }}>
              <pre>
                <code class="language-js">{JSON.stringify(log.requestBody, null, 4)}</code>
              </pre>
            </div>
            <label>Request Headers</label>
            <div style={{ backgroundColor: "#EEE" }}>
              <pre>
                <code class="language-js">{JSON.stringify(log.requestHeaders, null, 4)}</code>
              </pre>
            </div>
            <label>Response Headers</label>
            <div style={{ backgroundColor: "#EEE" }}>
              <pre>
                <code class="language-js">{JSON.stringify(log.responseHeaders, null, 4)}</code>
              </pre>
            </div>
            <label>User</label>
            <div style={{ backgroundColor: "#EEE" }}>
              <pre>
                <code class="language-js">{JSON.stringify(log.user, null, 4)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
