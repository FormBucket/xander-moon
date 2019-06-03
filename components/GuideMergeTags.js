/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuideMergeTags = () => (
  <Guide title="Guides" title2="Merge Tags">
    <div>
      <span>
        <p>
          Customize notification and autoresponders with{" "}
          <strong>Merge Tags</strong>.
        </p>
        <h3>What are merge tags?</h3>
        <p>
          <strong>Merge Tags</strong> are tokens that can be used to insert your
          form values into notification settings. This makes it possible to
          customize the messages to your unique requirements.
        </p>
        <h3>How does it look like?</h3>
        <p>Just like this...</p>
        <pre>
          <code>
            {"{"}
            {"{"} email {"}"}
            {"}"}
            {"\n"}
            {"{"}
            {"{"} name {"}"}
            {"}"}
            {"\n"}
            {"{"}
            {"{"}
            {"{"} html_text_with_triple_braces {"}"}
            {"}"}
            {"}"}
            {"\n"}
          </code>
        </pre>
        <h3>Can you show me some examples?</h3>
        <p>Absolutely! We love examples.</p>
        <h4>Example subjects</h4>
        <p>
          Got a submission {"{"}
          {"{"} submission_id {"}"}
          {"}"}
        </p>
        <p>
          New sign up at {"{"}
          {"{"} submission_date_time {"}"}
          {"}"}
        </p>
        <h4>Example message</h4>
        <pre>
          <code>
            New signup!{"\n"}
            {"\n"}Name: {"{"}
            {"{"}name{"}"}
            {"}"}
            {"\n"}Email: {"{"}
            {"{"}email{"}"}
            {"}"}
            {"\n"}
          </code>
        </pre>
        <h3>What fields can I use?</h3>
        <p>You can use your form field.</p>
        <p>Also, these parameters may be used:</p>
        <ul>
          <li>data</li>
          <li>submission_id</li>
          <li>bucket_id</li>
          <li>bucket_name</li>
          <li>account_name</li>
          <li>account_email</li>
          <li>submission_date_time</li>
          <li>submission_year</li>
          <li>submission_month</li>
          <li>submission_day</li>
          <li>submission_hour</li>
          <li>submission_minute</li>
          <li>submission_ampm</li>
        </ul>
        <h3>How can I display the data like the default template?</h3>
        <p>
          Our default template outputs all of your form fields to a unordered
          list.
        </p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">p</span>&gt;
            </span>
            {"\n"}
            {"  "}Here's all the details:{"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">p</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">ul</span>&gt;
            </span>
            {"\n"}
            {"  "}
            {"{"}
            {"{"}#data{"}"}
            {"}"}
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">li</span>&gt;
            </span>
            <span class="hljs-tag">
              &lt;<span class="hljs-name">strong</span>&gt;
            </span>
            {"{"}
            {"{"}name{"}"}
            {"}"}:
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">strong</span>&gt;
            </span>{" "}
            {"{"}
            {"{"}value{"}"}
            {"}"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">li</span>&gt;
            </span>
            {"\n"}
            {"  "}
            {"{"}
            {"{"}/data{"}"}
            {"}"}
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">ul</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <p>
          The data provided to the template for a typical contact form looks
          like:
        </p>
        <pre>
          <code class="language-json">
            {"{"}
            {"\n"}
            {"  "}
            <span class="hljs-attr">"bucket_id"</span>:{" "}
            <span class="hljs-string">"buk_your-bucket-id-here"</span>,
            {"\n"}
            {"  "}
            <span class="hljs-attr">"submission_id"</span>:{" "}
            <span class="hljs-string">"sub_your-submission-id-here"</span>,
            {"\n"}
            {"  "}
            <span class="hljs-attr">"account_email"</span>:{" "}
            <span class="hljs-string">
              "your-email-here@your-domain-here.com"
            </span>
            ,{"\n"}
            {"  "}
            <span class="hljs-attr">"email"</span>:{" "}
            <span class="hljs-string">"support@formbucket.com"</span>,{"\n"}
            {"  "}
            <span class="hljs-attr">"subject"</span>:{" "}
            <span class="hljs-string">"Hi"</span>,{"\n"}
            {"  "}
            <span class="hljs-attr">"message"</span>:{" "}
            <span class="hljs-string">
              "Can you help me with merge tags?"
            </span>
            ,{"\n"}
            {"  "}
            <span class="hljs-attr">"data"</span>: [{"\n"}
            {"    "}
            {"{"}
            {"\n"}
            {"      "}
            <span class="hljs-attr">"name"</span>:{" "}
            <span class="hljs-string">"email"</span>,{"\n"}
            {"      "}
            <span class="hljs-attr">"value"</span>:{" "}
            <span class="hljs-string">"support@formbucket.com"</span>
            {"\n"}
            {"    "}
            {"}"},{"\n"}
            {"    "}
            {"{"}
            {"\n"}
            {"      "}
            <span class="hljs-attr">"name"</span>:{" "}
            <span class="hljs-string">"subject"</span>,{"\n"}
            {"      "}
            <span class="hljs-attr">"value"</span>:{" "}
            <span class="hljs-string">"Hi"</span>
            {"\n"}
            {"    "}
            {"}"}
            {"\n"}
            {"  "}]{"\n"}
            {"}"}
            {"\n"}
          </code>
        </pre>
        <p>
          The {"{"}
          {"{"}#data{"}"}
          {"}"}...{"{"}
          {"{"}/data{"}"}
          {"}"} loops over the list. The default template will produce HTML
          like:
        </p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">p</span>&gt;
            </span>
            {"\n"}
            {"  "}Here's all the details:{"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">p</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">ul</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">li</span>&gt;
            </span>
            <span class="hljs-tag">
              &lt;<span class="hljs-name">strong</span>&gt;
            </span>
            email:
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">strong</span>&gt;
            </span>{" "}
            support@formbucket.com
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">li</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">li</span>&gt;
            </span>
            <span class="hljs-tag">
              &lt;<span class="hljs-name">strong</span>&gt;
            </span>
            subject:
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">strong</span>&gt;
            </span>{" "}
            Hi
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">li</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">li</span>&gt;
            </span>
            <span class="hljs-tag">
              &lt;<span class="hljs-name">strong</span>&gt;
            </span>
            message:
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">strong</span>&gt;
            </span>{" "}
            Can you help me with merge tags?
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">li</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">ul</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <h3>What if I want a more custom template?</h3>
        <p>We support that too!</p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            {"  "}
            {"{"}
            {"{"}subject{"}"}
            {"}"}
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}
            {"{"}
            {"{"}message{"}"}
            {"}"}
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}Send by{" "}
            <span class="hljs-tag">
              &lt;
              <span class="hljs-name">
                {"{"}
                {"{"}email{"}"}
                {"}"}
              </span>
              &gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <p>This will produce produce the result:</p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            {"  "}Hi{"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}Can you help me with merge tags?{"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}Send by{" "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">support@formbucket.com</span>&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">div</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <h3>Do Merge Tags follow a standard format?</h3>
        <p>
          Yes, our <strong>Merge Tags</strong> use{" "}
          <a href="https://mustache.github.io/mustache.5.html">
            the Mustache template language
          </a>
          .
        </p>
        <h3>Still need help?</h3>
        <p>
          <a href="/contact">Contact support</a>
        </p>
        <p>Thanks for choosing FormBucket!</p>
      </span>
    </div>
  </Guide>
);
export default GuideMergeTags;
