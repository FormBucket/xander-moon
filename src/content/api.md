## Powering static websites is our mission.

Collecting and managing data is a science and an art. You need to setup databases and install scripts. Protecting against spammers and bots is a risk and applications developed by friendly business partners can create DOS attacks. Our services helps you to create endpoints, access your data in real time, view, visualize, analyze, protect and monitor your data.  

The FormBucket API accepts _application/json_ requests via HTTPS and is secured with the recent [IETF Standard 7519 JSON Web Tokens (JWT)](https://tools.ietf.org/html/rfc7519).

## Accounts / profile

The APIs will only respond when presented with a token. Requests that do not include a token or include an invalid token will be denied.

The token must be provided via an HTTP Header named _Authorization_ that contains the value _Bearer {token}_.

With the fetch API you can call with:

```js
fetch('https://stream.formbucket.com/signup', {
  method: 'POST',
  headers: {
    ContentType: 'application/json'
  },
  body: JSON.stringify({ email: 'you@domain.com', password: 'shhhh' })
})
.then(res => res.text())
.then(token => console.log(`Your token is ${token}`))
```

Upon successful signup the user is issued a token.

```js
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NjhkZjZjMGM4ZDVhZmQxYTJkMDVmMzMiLCJvcmdOYW1lIjoiIiwiZW1haWwiOiJmb29AZm9vMS5jb20iLCJpYXQiOjE0NTIyNDUxNTA2NjN9.NP-6XQGZdpDJfRW8r-gHdeCGmyhKCFSGSUmA3pCiUMY'
```

This token must be presented to access data APIs.

```js
fetch('https://stream.formbucket.com/buckets', {
  method: 'GET',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
})
.then(res => res.text())
.then(token => console.log(`Your token is ${token}`))
```

A returning user may obtain a new token by presenting their username and password.

```js
fetch('https://stream.formbucket.com/login', {
  method: 'POST',
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ email: 'you@domain.com', password: 'shhhh' })
})
.then(res => res.text())
.then(token => console.log(`Your token is ${token}`))
```

## Buckets

Users may choose from fixed or variable sized buckets. The fixed size buckets will overwrite the oldest submissions.

### Get a list of your buckets

```curl
GET https://stream.formbucket.com/buckets
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

```curl
GET https://stream.formbucket.com/buckets/:id
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
  "loaded": true,
  "_id": "568e05fec7738ff3a349c62e",
  "id": "KfdHERM",
  "user_id": "568df6c0c8d5afd1a2d05f33",
  "name": "Test Bucket",
  "updated_on": "2016-01-08T00:41:19.732Z",
  "enabled": true,
  "email_to": true,
  "auto_responder": {
      "from": "me@domain.com",
      "subject": "Thanks!",
      "body": "I appreciate your response. I will reply as soon as possible. Thanks!"
  },
  "submission_count": 5747
}
```

### Create a new bucket

```curl
POST https://stream.formbucket.com/buckets
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

```curl
PUT https://api.formbucket.com/buckets
```

#### Parameters

Accepts same parameters used to create a bucket.

### Delete a bucket

```curls
DELETE https://api.formbucket.com/buckets/:id
```
__WARNING.__ The Bucket and data are gone and cannot be recovered.

## Submissions

Submissions are actual form data entered by the users of your bucket.

### Get all submissions in a bucket

```curl
GET https://api.formbucket.com/buckets/:id/submissions?limit=10&offset=0&sort=%7Bcreated_on:%20-1%7D
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
POST https://api.formbucket.com/:id
```


#### Parameters

The form may include any field needed to meet your data collection requirement.

### Delete a submission

DELETE https://www.FormBucket.com/submissions/:id

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
