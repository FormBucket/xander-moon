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

let example = `<form method="post"
      action="https://formbucket.com/f/<your-bucket-id-here>"
      enctype="multipart/form-data">
    <input type="email" name="email" placeholder="Your email" />
    <input type="file" name="resume" placeholder="Your resume" />
    <input type="submit"/>
    <input type="reset" />
</form>`;

let GuideUploads = () => (
  <Guide title="Guides" title2="File Uploads">
    <p>
      FormBucket supports file uploads up to 5MB. To enable file upload you must
      add <em>enctype="multipart/form-data"</em> to your form.
    </p>
    <Ed value={example} />
  </Guide>
);
export default GuideUploads;
