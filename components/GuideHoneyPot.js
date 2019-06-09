/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
import "highlight.js/styles/github.css";
import "./styles/api.scss";

let example = `<form action="https://formbucket.com/f/buk_... " method="post">
  <input type="text" name="__bucket_trap__" style="display: none">
  <button type="submit">Want it ? Click here</button>
</form>`;

let GuideHoneyPot = () => (
  <Guide title="Honey Pot">
    <span>
      <p>A honey pot is a hidden field that must be left blank by the users.</p>
      <p>
        This trap will stop bots that put a value in every field to avoid
        required field validations.
      </p>
      <p>
        The default name for the field is "<strong>__bucket_trap__</strong>". If
        you prefer a different name then you can change it in your bucket's
        settings.
      </p>
      <p>An example HTML Form with a hidden honeypot:</p>
      <pre>
        <code class="language-html">{example}</code>
      </pre>
    </span>
  </Guide>
);
export default GuideHoneyPot;
