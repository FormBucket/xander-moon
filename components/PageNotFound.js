/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";

export default props => (
  <div>
    <div class="page-heading">
      <div class="wrapper">
        <h1>Page Not Found</h1>
      </div>
    </div>
    <div class="wrapper">
      <h2>Maybe Bucketkitty can find it?</h2>
      <img src={import("../img/bucketkitty.gif")} alt="bucketkitty" />
    </div>
  </div>
);
