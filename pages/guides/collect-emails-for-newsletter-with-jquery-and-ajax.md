---
title: How to submit with jQuery
heading: Create a Signup Form with jQuery and AJAX
date: 2016-08-20
layout: static.html
---
## Overview

In this tutorial we'll show you how to set up a simple newsletter signup form to capture emails using FormBucket, jQuery and AJAX. When visitors submit the form, you can keep them on the same page and display a message that they've been added to the list (or not if there was a problem).

Check out the [**Live Demo**](/newsletter/) (and sign up for the spectacular FormBucket newsletter).

Here is the basic markup for our form.

```html
<form id="subscribe"
      action="post"
      method="http://api.formbucket.com/f/MyBucketId">
  <input type="email"
         name="email"
         placeholder="Enter your email...">
  <input type="submit" value="Get the Newsletter" />
</form>
```

As an awesome web designer you are going to use your own pixel perfect CSS (or maybe even SCSS) to style the form, so we won't cover that in this tutorial.

Now let's get on to the hard stuff...

## Collecting the data

FormBucket's API accepts data in two formats: `form` and `json`. For simple use case like this one, you probably want to use form. For advanced use case you may prefer to opt into our [JSON API](/docs/api/).

### Option 1 - Post Form Data with jQuery

The complete script includes an outer function that runs after the
page is loaded, and it adds an event handler for our form that prevents the default
action (e.g. leaving the page). It also includes some validations so that people
don't send you blank values.

```js
$(function() {
  $('#subscribe').submit(function(event) {
    event.preventDefault();

    var subscribeForm = $(this);
    var subscribeButton = $('input[type=submit]', subscribeForm);

    if ($("input[name='email']").val() === '') {
      alert('Please enter an email address')
      return
    }

    $.ajax({
      url: subscribeForm.prop('action'),
      type: 'POST',
      crossDomain: true,
      headers : {
        'accept' : 'application/javascript',
      },
      data: $('#subscribe').serialize(),
      beforeSend: function() {
        subscribeButton.prop('disabled', 'disabled');
      }
    })
    .done(function(response) {
      // You will do something WAY BETTER than alert
      // because you are an awesome designer.
      alert('Thanks for subscribing!')
    })
    .fail(function(response) {
      alert('Dang, something went wrong!')
      subscribeButton.prop('disabled', false);
    })

  });
});
```

### Option 2 - Post JSON Data with jQuery

If you want to use our JSON API, then you could change the AJAX call to the following. This example uses the powerful (and somewhat cryptic) `reduce` function, but you can build the JSON content any way you like.

```js
$.ajax({
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
})
```

Hope you found this helpful! If so please tell us (and your friends) on [Twitter @formbucket](https://twitter.com/FormBucket). Thanks!
