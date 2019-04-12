/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
let GuideIndex = () => (
  <Guide title="Guides" title2="Welcome">
    <p>
      Want to collect forms on your site? These docs will help. Need more help?{" "}
      <a href="/contact">contact us</a>
    </p>
    <h3>Form Setup</h3>
    <h6>
      <a href="/guides/collect-emails-for-newsletter-with-jquery">
        Collect emails with jQuery
      </a>
    </h6>
    <p>
      In this tutorial we'll show you how to set up a simple newsletter signup
      form to capture emails using FormBucket, jQuery and AJAX.
    </p>
    <hr />
    <h6>
      <a href="/guides/merge-tags">Merge Tags</a>
    </h6>
    <p>Personalize your autoresponder emails with merge tags.</p>
    <hr />
    <h6>
      <a href="/guides/json-endpoints">JSON Endpoints</a>
    </h6>
    <p>This option sets up an endpoint that always returns a JSON object.</p>
    <hr />
    <h6>
      <a href="/guides/radio-buttons">Radio Buttons</a>
    </h6>
    <p>Send a radio button, when you want only 1 option selected at a time.</p>
    <hr />
    <h3>Spam / Security</h3>
    <h6>
      <a href="/guides/howto-setup-recaptcha">Set Up reCAPTCHA</a>
    </h6>
    <p>
      Prevent bots from filling out your forms, supports invisible recaptcha.
    </p>
    <hr />
    <h6>
      <a href="/guides/honeypot">Honey Pot</a>
    </h6>
    <p>Learn about honeypot. A common technique to defeat simple spam bots.</p>
    <hr />
    <h3>Developer Docs</h3>
    <h6>
      <a href="/docs/api">API</a>
    </h6>
    <p>Check out the FormBucket API with examples.</p>
    <hr />
    <h6>
      <a href="/docs/webhooks">Webhooks</a>
    </h6>
    <p>Webhooks forward your submissions to external systems.</p>
    <hr />
    <h3>Legal / Privacy</h3>
    <h6>
      <a href="/guides/pricing">
        Pricing
      </a>
    </h6>
    <p>How we charge for services.</p>
    <h6>
      <a href="/docs/terms">Terms</a>
    </h6>
    <p>Learn about our terms of use.</p>
    <hr />
    <h6>
      <a href="/docs/privacy-policy">Privacy Policy</a>
    </h6>
    <p>Learn more about how FormBucket protects your privacy.</p>
    <hr />
    <h6>
      <a href="/docs/general-data-protection-regulation">GDPR</a>
    </h6>
    <p>
      Learn about how FormBucket complies with the General Data Protection
      Regulation.
    </p>
    <hr />
  </Guide>
);
export default GuideIndex;
