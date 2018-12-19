/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";

let Guide = ({ title, title2, children }) => (
  <div>
    <div class="page-heading">
      <div class="wrapper">
        <h1>{title}</h1>
      </div>
    </div>
    <div class="wrapper">
      <h2>{title2}</h2>
      {children}
    </div>
  </div>
);

export default Guide;
