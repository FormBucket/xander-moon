/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuideWebhooks = () => (
  <Guide title="Guides" title2="Webhooks">
    <p>
      Webhooks forward your events, making it possible to integrate with
      external systems.
    </p>
    <p>
      Webhooks send standard HTTP requests with the POST method, along with the
      data from your form. The other system must accept the request.
    </p>
    <p>
      When a submission is received into your bucket a webhook is sent to each
      URL configured in your bucket.
    </p>
    <p>
      Sending your submissions to task automation frameworks, like Zapier,
      enables integration with many other systems like Salesforce and many
      others.
    </p>
  </Guide>
);
export default GuideWebhooks;
