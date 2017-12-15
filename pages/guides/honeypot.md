---
title: Honey Pot
heading: Honey Pot
date: 2016-08-20
layout: static.html
email: "{{ email }}"
name: "{{ name }}"
phone: "{{ phone }}"
---

A honey pot is a hidden field that must be left blank by the users.

This trap will caught bots that put a value in every field to avoid
required field validations.

The default name for the field is "__bucket_trap__". If you prefer a
different name then you can change in the bucket settings.

An example HTML Form with a hidden honeypot:

```html
<form action="https://api.formbucket.com/f/buk_...  " method="post">
  <input type="text" name="__bucket_trap__" style="display: none">
  <button type="submit">Want it ? Click here</button>
</form>
```
