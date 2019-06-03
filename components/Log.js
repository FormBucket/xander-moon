/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import format from "date-fns/format";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

class Log extends Component {
  render() {
    var { log, user } = this.props;

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
            <div>
              <Editor
                value={JSON.stringify(log.requestBody, null, 4)}
                highlight={code => highlight(code, languages.json)}
              />
            </div>
            <label>Request Headers</label>
            <div>
              <Editor
                value={JSON.stringify(log.requestHeaders, null, 4)}
                highlight={code => highlight(code, languages.json)}
              />
            </div>
            <label>Response Headers</label>
            <div>
              <Editor
                value={JSON.stringify(log.responseHeaders, null, 4)}
                highlight={code => highlight(code, languages.json)}
              />
            </div>
            <label>User</label>
            <div>
              <Editor
                value={JSON.stringify(log.user, null, 4) || ""}
                highlight={code => highlight(code, languages.json)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
