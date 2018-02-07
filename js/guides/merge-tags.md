## Customize auto responders with **merge tags**

### What are merge tags?

**Merge tags** are tokens placed around a field name.

Merge tags allow you to customize the response per submission.

## What does it look like?

Just like this...

```
{{ email }}
{{ name }}
{{ phone }}
```

### Can you show me some examples?

Absolutely!

#### Example subjects

Got a submission \{{ submission_id }}

New sign up at \{{ submission_date_time }}

#### Example message

```
New signup!

Name: {{name}}
Email: {{email}}
```

### What fields can I use?

You can use any field from your form.

Also, these parameters may be used:

  - submission_id
  - bucket_id
  - bucket_name
  - account_name
  - account_email
  - submission_date_time
  - submission_year
  - submission_month
  - submission_day
  - submission_hour
  - submission_minute
  - submission_ampm

### More info

Our **merge tags** use [Twitter's implementation of the Mustache template language](http://twitter.github.io/hogan.js/).

Hope you find this helpful. Please contact us if you need any assistance.
