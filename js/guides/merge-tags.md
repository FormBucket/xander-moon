Customize notification and autoresponders with **Merge Tags**.

### What are merge tags?

**Merge Tags** are tokens that can be used to insert your form values into
notification settings. This makes it possible to customize the messages
to your unique requirements.

### How does it look like?

Just like this...

```
{{ email }}
{{ name }}
{{{ html_text_with_triple_braces }}}
```

### Can you show me some examples?

Absolutely! We love examples.

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

You can use your form field.

Also, these parameters may be used:

- data
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

### How can I display the data like the default template?

Our default template outputs all of your form fields to a unordered list.

```html
<p>
  Here's all the details:
</p>
<ul>
  {{#data}}
  <li><strong>{{name}}:</strong> {{value}}</li>
  {{/data}}
</ul>
```

The data provided to the template for a typical contact form looks like:

```json
{
  "bucket_id": "buk_your-bucket-id-here",
  "submission_id": "sub_your-submission-id-here",
  "account_email": "your-email-here@your-domain-here.com",
  "email": "support@formbucket.com",
  "subject": "Hi",
  "message": "Can you help me with merge tags?",
  "data": [
    {
      "name": "email",
      "value": "support@formbucket.com"
    },
    {
      "name": "subject",
      "value": "Hi"
    }
  ]
}
```

The {{#data}}...{{/data}} loops over the list. The default template will produce
HTML like:

```html
<p>
  Here's all the details:
</p>
<ul>
  <li><strong>email:</strong> support@formbucket.com</li>
  <li><strong>subject:</strong> Hi</li>
  <li><strong>message:</strong> Can you help me with merge tags?</li>
</ul>
```

### What if I want a more custom template?

We support that too!

```html
<h1>
  {{subject}}
</h1>
<div>
{{message}}
</div>
<div>
Send by <{{email}}>
</div>
```

This will produce produce the result:

```html
<h1>
  Hi
</h1>
<div>
Can you help me with merge tags?
</div>
<div>
Send by <support@formbucket.com>
</div>
```

### Do Merge Tags follow a standard format?

Yes, our **Merge Tags** use [the Mustache template language](https://mustache.github.io/mustache.5.html).

### Still need help?

[Contact support](/contact)

Thanks for choosing FormBucket!
