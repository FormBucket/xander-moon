/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";
let GuideJSONEndpoints = () => (
  <div class="main">
    <div class="page-heading">
      <div class="wrapper">
        <h1>Guides</h1>
      </div>
    </div>
    <div class="wrapper">
      <h2> Json Endpoints</h2>
      <div>
        <span>
          <p>
            The "JSON Endpoint?" configures an endpoint to only return JSON.
          </p>
          <p>Requests returns an object with the submission id or an error.</p>
          <h3>Good result</h3>
          <pre>
            <code class="language-js">
              {"{"}
              <span class="hljs-string">"id"</span>:
              <span class="hljs-string">"sub_48ATRBzNKf458L16Wlz2O3lu"</span>\}
            </code>
          </pre>
          <h3>Bad result</h3>
          <pre>
            <code class="language-js">
              {"{"}
              <span class="hljs-string">"error"</span>:
              <span class="hljs-string">"something bad..."</span>}
            </code>
          </pre>
          <p>
            See the <a href="/guides/api">API Guide</a> too for more details.
          </p>
        </span>
      </div>
    </div>
  </div>
);

export default GuideJSONEndpoints;
