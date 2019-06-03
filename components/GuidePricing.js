/** @jsx h */
/**
 * Copyright (c) 2015-2018, microbucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuidePricing = () =>
  false ? (
    <Guide title="Pricing">
      <p>
        The monthly membership cost is $7/mo. This includes unlimited buckets
        and submissions.
      </p>
    </Guide>
  ) : (
    <Guide title="Pricing">
      <p>Today, our pricing is a simple monthly membership fee of $7/mo.</p>
      <hr />
      <p>
        We plan to adopt a new pricing model so that you pay only for what you
        use.
      </p>
      <p>
        Your total cost will depend on usage. Must purchase prepaid credits to
        perform actions. Credits never expire.
      </p>
      <h2>Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>$Cost (US Dollars)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Per Form Submission</td>
            <td>$0.001</td>
          </tr>
          <tr>
            <td>Bucket enabled per hour</td>
            <td>$0.0003</td>
          </tr>
          <tr>
            <td>Per Notification</td>
            <td>$0.01</td>
          </tr>
          <tr>
            <td>Per Autoresponder</td>
            <td>$0.02</td>
          </tr>
          <tr>
            <td>Per Webhook</td>
            <td>$0.02</td>
          </tr>
          <tr>
            <td>Per API Request</td>
            <td>$0.0001</td>
          </tr>
          <tr>
            <td>Export form submission</td>
            <td>$0.00001</td>
          </tr>
          <tr>
            <td>Submission retained per hour</td>
            <td>$0.0000042</td>
          </tr>
          <tr>
            <td>Storage per GB per hour</td>
            <td>$0.001375</td>
          </tr>
          <tr>
            <td>Inbound data transfer per megabyte</td>
            <td>$0.0015</td>
          </tr>
          <tr>
            <td>Outbound data transfer per megabyte</td>
            <td>$0.0005</td>
          </tr>
        </tbody>
      </table>
      <h2>What can I buy for $1.00 U.S.?</h2>
      <ol>
        <li>Collect 1000 form submissions</li>
        <li>Receive 100 email notifications</li>
        <li>Send 20 automatic responses</li>
        <li>Trigger 50 webhooks</li>
        <li>Make 10,000 API requests</li>
        <li>Enable a bucket for 30 days</li>
        <li>Retain 10,000 records for 24 hours</li>
      </ol>
      <h2>How do I pay?</h2>
      <p>
        Payment is upfront. We accept payment by credit card, paypal and
        bitcoin.
      </p>
      <p>The minimum credit card payment is $10.</p>
      <h2>Can I limit my spending?</h2>
      <p>Yes, you may prevent excessive usage with account limits.</p>
      <ol>
        <li>
          Max Number of Submissions Per IP Address (Default: 10/ip/account/day)
        </li>{" "}
        <li>Max Forms Received (Default: $1.00/day)</li>
        <li>Max Emails Sent (Default: $5.00/day)</li>
        <li>Max Webhooks Delivered (Default: $5.00/day)</li>
      </ol>
      <h2>Transfers</h2>
      <p>
        Credits may be transferred between accounts. A service transfer fee is
        $0.29 + 1.5% .
      </p>
      <h2>Refunds</h2>
      <p>
        Payments are non-refundable. They may only be redeemed for work. Account
        credits never expire.
      </p>
      <h2>Autopay</h2>
      <p>Signup for monthly auto pay to get 20% in free credits each month.</p>
    </Guide>
  );
export default GuidePricing;
