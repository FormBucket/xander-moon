/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

let Ed = ({ value }) => (
  <Editor
    readOnly
    value={value}
    highlight={code => highlight(code, languages.js)}
    padding={10}
    style={{
      fontFamily: '"Fira code", "Fira Mono", monospace',
      marginBottom: 20,
      color: "#512da8"
    }}
  />
);

let guide = (
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
        <Ed
          value={`<form id="subscribe"
method="post"
action="http://api.formbucket.com/f/MyBucketId">
<input type="email"
name="email"
placeholder="Enter your email...">
<input type="submit" value="Get the Newsletter" />
</form>`}
        />
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
        <Ed
          value={`$(function() {
  $('#subscribe').submit(function(event) {
    event.preventDefault();

    var form = $(this);
    var btn = $('input[type=submit]', form);

    if ($("input[name='email']").val() === '') {
      alert('Please enter an email address')
      return
    }

    $.ajax({
      url: form.prop('action'),
      type: 'POST',
      crossDomain: true,
      headers : {
        'accept' : 'application/javascript',
      },
      data: form.serialize(),
      beforeSend: function() {
        btn.prop('disabled', 'disabled');
      }
    })
    .done(function(response) {
      // You might something WAY BETTER than a simple alert in your design.
      alert('Thanks for subscribing!');
      btn.prop('disabled', false);
    })
    .fail(function(response) {
      alert('Dang, something went wrong!');
      btn.prop('disabled', false);
    })

  });
});`}
        />
        <h4>Option 2 - Post JSON Data with jQuery</h4>
        <p>
          If you want to use our JSON API, then you could change the AJAX call
          to the following.
        </p>
        <Ed
          value={`$.ajax({
  url: 'https://api.formbucket.com/f/CPaseeA',
  type: 'POST',
  crossDomain: true,
  headers : {
    'accept' : 'application/javascript',
    'content-type': 'application/json'
  },
  data: $('#subscribe')
  .serializeArray()
  .reduce(function(p,v){ p[v.name] = v.value; return p }, {});
})`}
        />
        <p>
          This example abbove the <strong>reduce</strong> function, but you can
          build the JSON content any way you like.
        </p>
        <p>
          Hope you found this helpful! If so please tell us (and your friends)
          on <a href="https://twitter.com/FormBucket">Twitter @formbucket</a>.
          Thanks!
        </p>
      </span>
    </div>
  </Guide>
);

export default () => guide;
