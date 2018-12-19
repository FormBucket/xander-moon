/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";

let About = ({ support_email = "mailto:support@formbucket.com" }) => (
  <div>
    <div class="page-heading">
      <div class="wrapper">
        <h1>Powering forms is our mission.</h1>
      </div>
    </div>
    <div class="wrapper">
      <p>
        We started FormBucket to scratch our own itch as web developers in need
        of a powerful form handling and automation solution for our static site
        projects. FormBucket gives web developers and designers an instant
        backend for any form with a simple URL endpoint.
      </p>

      <p>
        Since launching, FormBucket has been featured in <b>ProductHunt</b>,{" "}
        <b>Web Designer Depot</b> and <b>Hacker News</b>.
      </p>

      <p>
        Try <a href="/signup">FormBucket free for 14 days</a>, no credit card
        required!
      </p>

      <p>Sincerely,</p>

      <p>
        <a href={support_email}>The FormBucket Team</a>
      </p>
    </div>
  </div>
);

export default About;
