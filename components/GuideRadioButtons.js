/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
import "highlight.js/styles/github.css";
import "./styles/api.scss";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

let Ed = ({ value }) => (
  <Editor
    readOnly
    value={value}
    highlight={code => highlight(code, languages.js)}
    padding={10}
    style={{
      fontFamily: '"Fira code", "Fira Mono", monospace',
      marginBottom: 20,
      color: "#512da8"
    }}
  />
);

let GuideRadioButtons = () => (
  <Guide title="Guides" title2="Setup Radio Buttons">
    <div>
      <span>
        <p>
          Radio buttons can seem difficult until you learn that multiple inputs
          must have the same name.
        </p>
        <p>To create a radio buttons:</p>
        <Ed
          value={`<input type="radio" name="make" value="Ford" checked>
<input type="radio" name="make" value="General Motors">
<input type="radio" name="make" value="Telsa">`}
        />
        <p>Only the value for the checked input will be sent to the server.</p>
      </span>
    </div>
  </Guide>
);
export default GuideRadioButtons;
