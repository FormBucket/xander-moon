/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h } from "preact";

const Footer = () => (
  <div class="footer">
    <div>
      <a href="https://twitter.com/formbucket" target="_blank">
        Twitter
      </a>{" "}
      |{" "}
      <a href="https://github.com/formbucket" target="_blank">
        Github
      </a>{" "}
      | <a href="/guides">Guides</a> |{" "}
      <a href="https://status.formbucket.com/">Status</a> |{" "}
      <a href="/about" native>
        About
      </a>{" "}
      |{" "}
      <a href="/contact" native>
        Contact
      </a>{" "}
      |{" "}
      <a href="/docs/terms" native>
        Terms
      </a>{" "}
      |{" "}
      <a href="/docs/privacy-policy" native>
        Privacy
      </a>{" "}
      | <a href="/docs/general-data-protection-regulation">GDPR</a>
    </div>

    <p>
      &copy; 2015-2018{" "}
      <a href="https://www.formbucket.com">
        {/* <img
          style={{
            height: 30,
            paddingLeft: 5,
            paddingRight: 2,
            paddingTop: 15
          }}
          src={"/logo-purple.svg"}
          alt="FormBucket"
        /> */}
        FormBucket LLC
      </a>
    </p>
  </div>
);

export default Footer;
