/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuideNewsletter = () => (
  <Guide title="Guides" title2="Collect Emails With jQuery">
    <div>
      <span>
        <h3>Overview</h3>
        <p>
          In this tutorial we'll show you how to set up a simple newsletter
          signup form to capture emails using FormBucket, jQuery and AJAX. When
          visitors submit the form, you can keep them on the same page and
          display a message that they've been added to the list (or not if there
          was a problem).
        </p>
        <p>
          Check out the{" "}
          <a href="/newsletter/">
            <strong>Live Demo</strong>
          </a>{" "}
          (and sign up for the spectacular FormBucket newsletter).
        </p>
        <p>Here is the basic markup for our form.</p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">form</span>{" "}
              <span class="hljs-attr">id</span>=
              <span class="hljs-string">"subscribe"</span>
              {"\n"}
              {"      "}
              <span class="hljs-attr">method</span>=
              <span class="hljs-string">"post"</span>
              {"\n"}
              {"      "}
              <span class="hljs-attr">action</span>=
              <span class="hljs-string">
                "http://api.formbucket.com/f/MyBucketId"
              </span>
              &gt;
            </span>
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">input</span>{" "}
              <span class="hljs-attr">type</span>=
              <span class="hljs-string">"email"</span>
              {"\n"}
              {"         "}
              <span class="hljs-attr">name</span>=
              <span class="hljs-string">"email"</span>
              {"\n"}
              {"         "}
              <span class="hljs-attr">placeholder</span>=
              <span class="hljs-string">"Enter your email..."</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span class="hljs-tag">
              &lt;<span class="hljs-name">input</span>{" "}
              <span class="hljs-attr">type</span>=
              <span class="hljs-string">"submit"</span>{" "}
              <span class="hljs-attr">value</span>=
              <span class="hljs-string">"Get the Newsletter"</span> /&gt;
            </span>
            {"\n"}
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">form</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <p>
          As an awesome web designer you are going to use your own pixel perfect
          CSS (or maybe even SCSS) to style the form, so we won't cover that in
          this tutorial.
        </p>
        <p>Now let's get on to the hard stuff...</p>
        <h3>Collecting the data</h3>
        <p>
          FormBucket's API accepts data in two formats: <code>form</code> and{" "}
          <code>json</code>. For simple use case like this one, you probably
          want to use form. For advanced use case you may prefer to opt into our{" "}
          <a href="/docs/api/">JSON API</a>.
        </p>
        <h4>Option 1 - Post Form Data with jQuery</h4>
        <p>
          The complete script includes an outer function that runs after the
          page is loaded, and it adds an event handler for our form that
          prevents the default action (e.g. leaving the page). It also includes
          some validations so that people don't send you blank values.
        </p>
        <pre>
          <code class="language-js">
            $(
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params" />){" "}
            </span>
            {"{"}
            {"\n"}
            {"  "}$(<span class="hljs-string">'#subscribe'</span>).submit(
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params">event</span>){" "}
            </span>
            {"{"}
            {"\n"}
            {"    "}event.preventDefault();{"\n"}
            {"\n"}
            {"    "}
            <span class="hljs-keyword">var</span> subscribeForm = $(
            <span class="hljs-keyword">this</span>);{"\n"}
            {"    "}
            <span class="hljs-keyword">var</span> subscribeButton = $(
            <span class="hljs-string">'input[type=submit]'</span>,
            subscribeForm);{"\n"}
            {"\n"}
            {"    "}
            <span class="hljs-keyword">if</span> ($(
            <span class="hljs-string">"input[name='email']"</span>).val()
            === <span class="hljs-string">''</span>) {"{"}
            {"\n"}
            {"      "}alert(
            <span class="hljs-string">'Please enter an email address'</span>
            ){"\n"}
            {"      "}
            <span class="hljs-keyword">return</span>
            {"\n"}
            {"    "}
            {"}"}
            {"\n"}
            {"\n"}
            {"    "}$.ajax({"{"}
            {"\n"}
            {"      "}url: subscribeForm.prop(
            <span class="hljs-string">'action'</span>),{"\n"}
            {"      "}type: <span class="hljs-string">'POST'</span>,{"\n"}
            {"      "}crossDomain: <span class="hljs-literal">true</span>,
            {"\n"}
            {"      "}headers : {"{"}
            {"\n"}
            {"        "}
            <span class="hljs-string">'accept'</span> :{" "}
            <span class="hljs-string">'application/javascript'</span>,{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}data: $(<span class="hljs-string">'#subscribe'</span>
            ).serialize(),{"\n"}
            {"      "}beforeSend:{" "}
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params" />){" "}
            </span>
            {"{"}
            {"\n"}
            {"        "}subscribeButton.prop(
            <span class="hljs-string">'disabled'</span>,{" "}
            <span class="hljs-string">'disabled'</span>);{"\n"}
            {"      "}
            {"}"}
            {"\n"}
            {"    "}
            {"}"}){"\n"}
            {"    "}.done(
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params">response</span>){" "}
            </span>
            {"{"}
            {"\n"}
            {"      "}
            <span class="hljs-comment">
              // You will do something WAY BETTER than alert
            </span>
            {"\n"}
            {"      "}
            <span class="hljs-comment">
              // because you are an awesome designer.
            </span>
            {"\n"}
            {"      "}alert(
            <span class="hljs-string">'Thanks for subscribing!'</span>);
            {"\n"}
            {"      "}subscribeButton.prop(
            <span class="hljs-string">'disabled'</span>,{" "}
            <span class="hljs-literal">false</span>);{"\n"}
            {"    "}
            {"}"}){"\n"}
            {"    "}.fail(
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params">response</span>){" "}
            </span>
            {"{"}
            {"\n"}
            {"      "}alert(
            <span class="hljs-string">'Dang, something went wrong!'</span>);
            {"\n"}
            {"      "}subscribeButton.prop(
            <span class="hljs-string">'disabled'</span>,{" "}
            <span class="hljs-literal">false</span>);{"\n"}
            {"    "}
            {"}"}){"\n"}
            {"\n"}
            {"  "}
            {"}"});{"\n"}
            {"}"});{"\n"}
          </code>
        </pre>
        <h4>Option 2 - Post JSON Data with jQuery</h4>
        <p>
          If you want to use our JSON API, then you could change the AJAX call
          to the following. This example uses the powerful (and somewhat
          cryptic) <code>reduce</code> function, but you can build the JSON
          content any way you like.
        </p>
        <pre>
          <code class="language-js">
            $.ajax({"{"}
            {"\n"}
            {"  "}url:{" "}
            <span class="hljs-string">
              'https://api.formbucket.com/f/CPaseeA'
            </span>
            ,{"\n"}
            {"  "}type: <span class="hljs-string">'POST'</span>,{"\n"}
            {"  "}crossDomain: <span class="hljs-literal">true</span>,{"\n"}
            {"  "}headers : {"{"}
            {"\n"}
            {"    "}
            <span class="hljs-string">'accept'</span> :{" "}
            <span class="hljs-string">'application/javascript'</span>,{"\n"}
            {"    "}
            <span class="hljs-string">'content-type'</span>:{" "}
            <span class="hljs-string">'application/json'</span>
            {"\n"}
            {"  "}
            {"}"},{"\n"}
            {"  "}data: $(<span class="hljs-string">'#subscribe'</span>)
            {"\n"}
            {"  "}.serializeArray(){"\n"}
            {"  "}.reduce(
            <span class="hljs-function">
              <span class="hljs-keyword">function</span>(
              <span class="hljs-params">p,v</span>)
            </span>
            {"{"} p[v.name] = v.value;{" "}
            <span class="hljs-keyword">return</span> p {"}"}, {"{"}
            {"}"});{"\n"}
            {"}"}){"\n"}
          </code>
        </pre>
        <p>
          Hope you found this helpful! If so please tell us (and your friends)
          on <a href="https://twitter.com/FormBucket">Twitter @formbucket</a>.
          Thanks!
        </p>
      </span>
    </div>
  </Guide>
);
export default GuideNewsletter;
