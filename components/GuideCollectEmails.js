/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";

let GuideHoneyPot = () => (
  <div class="main">
    <div class="page-heading">
      <div class="wrapper">
        <h1>Guides</h1>
      </div>
    </div>
    <div class="wrapper">
      <h2> Honeypot</h2>
      <div>
        <span>
          <p>
            A honey pot is a hidden field that must be left blank by the users.
          </p>
          <p>
            This trap will caught bots that put a value in every field to avoid
            required field validations.
          </p>
          <p>
            The default name for the field is "<strong>bucket_trap</strong>". If
            you prefer a different name then you can change in the bucket
            settings.
          </p>
          <p>An example HTML Form with a hidden honeypot:</p>
          <pre>
            <code class="language-html">
              <span class="hljs-tag">
                &lt;<span class="hljs-name">form</span>{" "}
                <span class="hljs-attr">action</span>=
                <span class="hljs-string">
                  "https://api.formbucket.com/f/buk_... "
                </span>{" "}
                <span class="hljs-attr">method</span>=
                <span class="hljs-string">"post"</span>&gt;
              </span>
              <span class="hljs-tag">
                &lt;<span class="hljs-name">input</span>{" "}
                <span class="hljs-attr">type</span>=
                <span class="hljs-string">"text"</span>{" "}
                <span class="hljs-attr">name</span>=
                <span class="hljs-string">"__bucket_trap__"</span>{" "}
                <span class="hljs-attr">style</span>=
                <span class="hljs-string">"display: none"</span>&gt;
              </span>
              <span class="hljs-tag">
                &lt;<span class="hljs-name">button</span>{" "}
                <span class="hljs-attr">type</span>=
                <span class="hljs-string">"submit"</span>&gt;
              </span>
              Want it ? Click here
              <span class="hljs-tag">
                &lt;/<span class="hljs-name">button</span>&gt;
              </span>
              <span class="hljs-tag">
                &lt;/<span class="hljs-name">form</span>&gt;
              </span>
            </code>
          </pre>
        </span>
      </div>
    </div>
  </div>
);
export default GuideHoneyPot;
