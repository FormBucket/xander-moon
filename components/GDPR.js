/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";
let GDPR = () => (
  <div class="formbucket-gdpr">
    <div class="page-heading">
      <div class="wrapper">
        <h1>Guides</h1>
      </div>
    </div>
    <div class="wrapper">
      <h2> General Data Protection Regulation</h2>
      <div>
        <span>
          <p>
            <a href="/img/formbucket-data-processing-agreement-executed.pdf">
              Download signed agreement
            </a>
          </p>
          <p>
            FormBucket complies with privacy laws to make our service safe and
            secure.
          </p>
          <p>
            On May 25, 2018, the European Union's General Privacy Data
            Protection Regulation takes effect.
          </p>
          <p>
            In order to maintain compliance as a data controller you must obtain
            a data processing agreement (DPA) from each data processor.
            FormBucket acts a data processor. As the customer you must fulfill
            the requirements as the data controller.
          </p>
          <p>
            ​As part of our effort to ensure compliance we reviewed our service
            and our API to ensure that all of your data in our system may be
            accessed. Additionally we reviewed our service to ensure that your
            data can be removed from our system at your request.
          </p>
          <p>
            The agreement extends our <a href="/terms">terms of service</a>{" "}
            agreement.
          </p>
          <p>
            If you have any question please <a href="/contact">contact us</a>.
          </p>
        </span>
      </div>
    </div>
  </div>
);

export default GDPR;
