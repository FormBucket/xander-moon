Recaptcha is a service from Google that works to prevent bots from filling
out your forms.

## Step 1

[Register your site](https://www.google.com/recaptcha/intro/index.html) with Google's recaptcha service.

![Register site](/img/recaptcha-step1.png)

## Step 2

Add the code to your form.

First, add a **script** tag into the head.

```html
<script src='https://www.google.com/recaptcha/api.js'></script>
```

Second, put the **div** tag in the position you wish to display recaptcha.

```html
<div class="g-recaptcha"
    data-sitekey="6Lc_YSgTAAAAAPdIJ5hVuFFNvoljmLYx3E1d6kcu">
</div>
```

The **Site key** is provided by Google and can be shared with the public.

## Step 3

Enable recaptcha in your bucket's settings. Our server needs a **Secret key** provided by Google. This is used in the verification process to ensure
that the user is not a robot.

Optionally, you may provide a redirect url if the verification fails. Otherwise,
the user will be redirected back to the page with your form.

## Prevent submit with JavaScript

It is also possible to prevent the user from submitting the form with JavaScript.

Here is an example that uses jQuery and Google's recaptcha API.

```js
<script>
$(function() {
  $('form').submit(function() {
    if (grecaptcha.getResponse() == ""){
      alert("Please complete recaptcha!");
      return false
    }
  })
})
</script>
```

Hope this helps and we wish you luck keeping bots at bay!
