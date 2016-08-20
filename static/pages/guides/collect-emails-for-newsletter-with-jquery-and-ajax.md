---
title: How to submit with jQuery
heading: Collect emails with jQuery and AJAX
date: 2012-08-20
layout: static.html
---
## Overview

The guide will show you how to collect email addresses with **$.ajax**.

See this code in action and join our [newsletter](/newsletter/).

Our API supports two data formats for form submissions `forms` and `json`.

Let's image that you want to setup a simple email collection for your new sites awesome newsletter. First you are going to need a form to collect the addresses.

```html
<form id="newsletter-form"
      action="post"
      method="http://api.formbucket.com/f/MyBucketId">
  <input type="email"
         name="email"
         placeholder="Enter you email...">
  <input type="submit" value="Join Newsletter" />
</form>
```

Being the awesome web designer you are going to use CSS (or maybe even SCSS) to style your form and make it look pixel perfect on your beautifully designed site.

## Submitting data

FormBucket's API accepts data in two formats: `form` and `json`. For simple use case you probably want to use form. For advanced use case you may prefer to opt into our JSON API.

### Option 1 - Post Form Data with jQuery

```js
$(function() {
  $('#newsletter-form').submit(function(event) {
    event.preventDefault();

    var formEl = $(this);
    var submitButton = $('input[type=submit]', formEl);

    if ($("input[name='email']").val() === '') {
      alert('Please enter an email address')
      return
    }

    $.ajax({
      url: formEl.prop('action'),
      type: 'POST',
      crossDomain: true,
      headers : {
        'accept' : 'application/javascript',
      },
      data: $('#newsletter-form').serialize(),
      beforeSend: function() {
        submitButton.prop('disabled', 'disabled');
      }
    })
    .done(function(response) {
      // You will do something WAY BETTER than alert
      // because you are an awesome designer.
      alert('Thanks for joining our newsletter!')
    })
    .fail(function(response) {
      alert('Oh no! Something went wrong!')
      submitButton.prop('disabled', false);
    })

  });
});
```

### Option 2 - Post JSON Data with jQuery

To send JSON data you can change the AJAX code to:

```js
$.ajax({
  url: 'https://api.formbucket.com/f/CPaseeA',
  type: 'POST',
  crossDomain: true,
  headers : {
    'accept' : 'application/javascript',
    'content-type': 'application/json'
  },
  data: $('#newsletter-form')
  .serializeArray()
  .reduce(function(p,v){ p[v.name] = v.value; return p }, {});
})
```

Hope you found this helpful!
