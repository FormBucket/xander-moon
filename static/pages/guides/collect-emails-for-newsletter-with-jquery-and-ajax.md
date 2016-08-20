---
title: How to submit with jQuery
heading: Collect emails with jQuery and AJAX
date: 2012-08-20
layout: static.html
---
## Overview

Let's image that you want to setup email collection for your awesome site. You need a form to collect the emails. You don't want the user to leave the page and you are comfortable with jQuery so you want to **$.ajax**. This guide will show you how to do it.

[See this code in action and join our newsletter](/newsletter/).

Here is a simple example of how you might setup your markup.

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

As an awesome web designer you are going to use CSS (or maybe even SCSS) to style the form on your beautifully designed site. We don't cover how to style the form in this tutorial but we know you can make it look pixel perfect.

Now let's get on to the hard stuff...

## Collecting the data

FormBucket's API accepts data in two formats: `form` and `json`. For simple use case like this one you probably want to use form. For advanced use case you may prefer to opt into our JSON API.

### Option 1 - Post Form Data with jQuery

Here is the complete script. It includes an outer function that runs after the
page is loaded and it adds an event handler for our form that prevents the default
action (e.g. leaving the page). It also includes some validations so that people
don't send you blank values.

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

If you want to use our JSON API then you could change the AJAX call to the following. This example uses the powerful (and somewhat cryptic) `reduce` function but you can build the JSON content any way that you prefer.

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
