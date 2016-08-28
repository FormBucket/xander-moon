---
title: FormBucket.com - API Docs
heading: FormBucket API
date: 2012-08-20
layout: static.html
---
The FormBucket API accepts _application/json_ requests via HTTPS and is secured with the recent [IETF Standard 7519 JSON Web Tokens (JWT)](https://tools.ietf.org/html/rfc7519).

The API code examples use the fetch API. Please checkout [That's so fetch](https://jakearchibald.com/2015/thats-so-fetch/) and [Github's polyfill](https://github.com/github/fetch) for more information.

## Submit forms

Our API accepts data in two formats: form and JSON.

### Form data

```js
fetch( 'https://api.formbucket.com/f/CPaseeA', {
  method: 'post',
  mode: 'cors',
  headers: {
    'accept' : 'application/javascript',
  },
  body: jQuery('#my-form').serialize()
})
```

### JSON data

```js
fetch( 'https://api.formbucket.com/f/CPaseeA', {
  method: 'post',
  mode: 'cors',
  headers: {
    'accept' : 'application/javascript',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
    email: 'John@Smith.com',
    message: 'You guys are awesome!'
  })
})
```


## Accounts / profile

The APIs will only respond when presented with a token. Requests that do not include a token or include an invalid token will be denied.

The token must be provided via an HTTP Header named _Authorization_ that contains the value _Bearer {token}_.

With the fetch API you can call with:

```js
fetch('https://api.formbucket.com/signup', {
  method: 'POST',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json'
  },
  body: JSON.stringify({
    email: 'you@domain.com',
    password: 'shhhh'
  })
})
.then(res => res.text())
.then(token => console.log(`Your token is ${token}`))
```

Upon successful signup the user is issued a token.

```js
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NjhkZjZjMGM4ZDVhZmQxYTJkMDVmMzMiLCJvcmdOYW1lIjoiIiwiZW1haWwiOiJmb29AZm9vMS5jb20iLCJpYXQiOjE0NTIyNDUxNTA2NjN9.NP-6XQGZdpDJfRW8r-gHdeCGmyhKCFSGSUmA3pCiUMY'
```

A returning user may obtain a new token by presenting their user name and password.

```js
fetch('https://api.formbucket.com/signin', {
  method: 'POST',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
  },
  body: JSON.stringify({
    email: 'you@domain.com',
    password: 'shhhh'
  })
})
.then(res => res.text())
.then(token => console.log(`Your token is ${token}`))
```

## Buckets

Users may choose from fixed or variable sized buckets. The fixed size buckets will overwrite the oldest submissions.

### Get a list of your buckets

```js
fetch('https://api.formbucket.com/buckets.json', {
  method: 'GET',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
})
.then(res => res.json())
.then(buckets => console.log(buckets))
```

#### Example Response

```JSON
[
  {
    "id": "6h86zo",
    "enabled": true,
    "name": "Contact Form",
    "submission_count": 417
  },
  {
    "id": "5g75oz",
    "enabled": false,
    "name": "Product Interest Form",
    "submission_count": 142
  }
]
```

### Get a bucket

```js
fetch('https://api.formbucket.com/buckets/:id.json', {
  method: 'GET',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
})
.then(res => res.json())
.then(bucket => console.log(bucket))
```

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
limit        | number        | __Optional__. The maximum number of buckets to return in a single call. The default is 50.
offset            | number        | __Optional__. The number of records to skip before returning rows. Applied after sorting. The default is 0.
sort            | object        | __Required__. An object that describes the sort options. The default is **{ created_on: -1 }**.

#### Example Response

```JSON
{
  "_id": "57b80f4a400d0f911f3eac42",
  "enabled": true,
  "id": "WRtqGDc",
  "user_id": "578d7bd16b4125721efbbd83",
  "submission_count": 13,
  "name": "Newsletter",
  "updated_on": "2016-08-20T18:08:05.560Z"
}
```

### Create a new bucket

```js
fetch('https://api.formbucket.com/buckets.json', {
  method: 'POST',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
})
.then(res => res.json())
.then(bucket => console.log(bucket))
```

#### Parameters

Name            |   Type        | Description
--------------- | ------------- | -----------
bucket | object        | __Optional__. An object containing bucket settings. This object is whitelisted on the server to enforce the fields.

The field whitelist include:

    1. name : string
    2. enabled : boolean
    3. webhooks : array
    4. email_to: (boolean | string)
    5. auto_responder: ( false | object )
      1. from : string
      2. subject : string
      3. body: string
    6. redirect_url : string

#### Example Responses

When the bucket is successfully created:

```JSON
{ "success": true, "id": "KfdHERM"}
```

When an error occurs:

```JSON
{ "error": "apikey is required." }
```

### Update a bucket

```js
fetch('https://api.formbucket.com/buckets.json', {
  method: 'POST',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
  data: JSON.string({...})
})
.then(res => res.json())
.then(bucket => console.log(bucket))
```

#### Parameters

Accepts same parameters used to create a bucket.

### Delete a bucket

```js
fetch('https://api.formbucket.com/buckets/:id', {
  method: 'DELETE',
  mode: 'cors,',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
  data: JSON.string({...})
})
.then(res => res.json())
.then(bucket => console.log(bucket))
```

__WARNING.__ Your bucket and data are gone forever.

## Submissions

Submissions are actual form data entered by the users of your bucket.

### Get all submissions in a bucket

```curl
GET https://api.formbucket.com/buckets/:id/submissions.json?limit=10&offset=0&sort=%7Bcreated_on:%20-1%7D
```

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
id       | integer       | __Required__. The id of the bucket. This parameter is in the URL.
limit         | integer       | __Optional__. Restrict the number of submissions returned by the request. Default to 100.
offset        | integer       | __Optional__. Offset the result to enable paging. To keep it simple the first record is 1 and the last record is the number of submissions. Records are sorted by the time received.
sort        | object       | __Optional__.

#### Example Response

```JSON
[{
  "_id": "55a7281db501a6987ed5c354",
  "subject": "Customer request",
  "message": "Thanks for doing this. I really appreciate man."
},{
  "_id": "43b7281db501a6987ed5c354",
  "subject": "Help",
  "message": "I'm interested in hiring you for a project. Please contact me."
}]
```

### Create a new submission


```curl
POST https://api.formbucket.com/buckets/:id/submissions
```
or use the alias
```curl
POST https://api.formbucket.com/f/:id
```


#### Parameters

The form may include any field needed to meet your data collection requirement.

### Delete a submission

DELETE https://www.FormBucket.com/buckets/:bucket_id/submissions/:submission_id

 ## HTTP Status Codes

  ID    | Text
  ----- | ----
  200   | Success
  400   | Bad Request
  401   | Unauthorized
  403   | Forbidden
  404   | Not Found
  422   | Unprocessable Entity
  500   | Unexpected system error
