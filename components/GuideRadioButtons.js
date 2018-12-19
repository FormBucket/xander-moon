/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
import "highlight.js/styles/github.css";
import "./styles/api.scss";

let GuideRadioButtons = () => (
  <Guide title="Guides" title2="Setup Radio Buttons">
    <div>
      <span>
        <p>
          Radio buttons can seem difficult until you learn that multiple inputs
          must have the same name.
        </p>
        <p>To create a radio buttons:</p>
        <pre>
          <code class="language-html">
            {`<input type="radio" name="make" value="Ford" checked>
<input type="radio" name="make" value="General Motors">
<input type="radio" name="make" value="Telsa">`}
          </code>
        </pre>
        <p>Only the value for the checked input will be sent to the server.</p>
      </span>
    </div>
  </Guide>
);
export default GuideRadioButtons;
