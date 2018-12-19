/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuideWebhooks = () => (
  <Guide title="Pricing">
    <h3>Units Of Work</h3>
    <p>
      FormBucket charges points for work performed. Billable units of work are:
    </p>
    <ul>
      <li>Create Bucket (1000 points)</li>
      <li>Form Received (1 point)</li>
      <li>Blacklist IP Check (2 point)</li>
      <li>SpamAssassin Check (5 point)</li>
      <li>Akismet Check (15 point)</li>
      <li>Honeypot (1 point)</li>
      <li>Recaptcha (5 point)</li>
      <li>Notification (10 points)</li>
      <li>Autoresponder (20 points)</li>
      <li>Webhook (5 points)</li>
      <li>Export Submission (1/10 point)</li>
      <li>Submission Retention (1 point per month)</li>
    </ul>
    <p>The cost for 10,000 points is $10.</p>
    <h3>Payment</h3>
    <p>
      FormBucket.com accepts credit card and bitcoin. Your payment buys points.
      A $10 payment buys 10,000 points. Minimum is $10.
    </p>
    <h3>Limits</h3>
    <p>Set limits to prevent excessive usage.</p>
    <ul>
      <li>
        Max Number of Submissions Per IP Address (Default: 10/ip/account/day)
      </li>
      <li>Max Forms Received (Default: 5,000/points/day)</li>
      <li>Max Emails Sent (Default: 5,000/points/day)</li>
      <li>Max Webhooks Delivered (Default: 5,000/points/day)</li>
    </ul>
    <h3>Membership</h3>
    <p>FormBucket membership is exclusive. You can apply or be invited.</p>
    <p>Use invitation credits to invite your friends.</p>
    <p>Users that violate our terms will be banned.</p>
    <h3>Transfer</h3>
    <p>
      Credits may be transferred between accounts. A 1.5% service fee is
      charged.
    </p>
    <h3>Refunds</h3>
    <p>
      Payments are non-refundable. They may only be redeemed for work. Credits
      never expire.
    </p>
    <h3>Autopay</h3>
    <p>
      Want to purchase points each month, year or when your account gets low?
      Signup for autopay.
    </p>
  </Guide>
);
export default GuideWebhooks;
