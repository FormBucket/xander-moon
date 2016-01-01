## Reliably collecting forms from your static website is our mission.

The FormBucket API enables integration with 3rd party system over
an industry standard REST API. Data is returned in JSON format.
---

## Buckets


### Get a list of your buckets

GET https://www.FormBucket.com/buckets.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
apikey        | string        | __Required__. The API key provided on your user profile page

#### Example Response

```js
[
  {
    "id": "5g75oz",
    "name": "Product Interest Form",
    "date": "2015-03-30T03:41:47.344Z",
    "token": "Dfj7Iv8Bt3",
    "submission_count": 142
  },
  {
    "id": "6h86zo",
    "name": "Contact Form",
    "date": "2015-01-24T03:41:47.344Z",
    "token": "Egh8Iv9Bt3",
    "submission_count": 417
  }
]
```

### Get a bucket

GET https://www.FormBucket.com/buckets/:id.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
apikey        | string        | __Required__. The API key provided on your user profile page.
id            | string        | __Required__. The id assigned to the bucket.

#### Example request

GET https://www.FormBucket.com/buckets/123.json?apikey=e705c568-8869-4ca2-8a58-78ba782423c4

#### Example Response

```js
{
  "id": "5g75oz",
  "name": "Product Interest Form",
  "date": "2015-03-30T03:41:47.344Z",
  "token": "Dfj7Iv8Bt3",
  "submission_count": 142
}
```

### Create a new bucket

POST https://www.FormBucket.com/buckets

#### Parameters

Name            |   Type        | Description
--------------- | ------------- | -----------
apikey          | string        | __Required__. The API key provided on your user profile page
name            | string        | __Required__. The name to identify the bucket.
enabled         | boolean       | __Optional__. Disable a bucket to stop new submissions without deleting your data. Default to true.
email_to        | string        | __Optional__. A list of email address to email submissions. Default to address in user profile.
redirect_url    | string        | __Optional__. The URL to redirect a user after successful submission. Please not that this does not apply to submission sent over AJAX.  Default to blank.
webhooks        | array         | __Optional__. A list of webhooks to send submissions via a POST after they are recorded in our system. A web is a URL that will accept the bucket data. Default to empty list.
required_fields | array        | __Optional__. A list of fields that are required to record the submission in our system. If required fields are omitted then the submission is rejected and the request redirected back to the origin.

#### Example Responses

When the bucket is successfully created:

```js
{ "success": true }
```

When an error occurs:

```js
{ "code": 1, "error": "apikey is required." }
```


### Update a bucket

PUT https://www.FormBucket.com/buckets/:id

#### Parameters

Accepts same parameters used to create the bucket.

#### Example responses

See example responses in "Create a new bucket"

### Delete a bucket

DELETE https://www.FormBucket.com/buckets/:id

__WARNING.__ Deleting a bucket deletes all submissions in this bucket.

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
apikey        | string        | __Required__. The API key provided on your user profile page

## Submissions

Submissions are actual form data entered by the users of your bucket.

### Get all submissions in a bucket

GET https://www.FormBucket.com/submissions/:bucket_id.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
apikey        | string        | __Required__. The API key provided on your user profile page
bucket_id       | integer       | __Required__. The id of the bucket. This parameter is in the URL instead of the query string.
limit         | integer       | __Optional__. Restrict the number of submissions returned by the request. Default to 100.
offset        | integer       | __Optional__. Offset the result to enable paging. To keep it simple the first record is 1 and the last record is the number of submissions. Records are sorted by the time received.

#### Example Response

```JSON
[
  {
    "bucket_id":
    "total": 1,
    "count": 1,
    "limit": 10,
    "offset": 0,
    "data": [{
      "_id": "55a7281db501a6987ed5c354",
      "subject": "Customer request",
      "message": "Thanks for doing this. I really appreciate man."
    }]
  }
]
```

### Create a new submission

POST https://www.FormBucket.com/f/:id

#### Parameters

The form may include any field needed to meet your data collection requirement.

### Delete a submission

DELETE https://www.FormBucket.com/submissions/:id

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
apikey        | string        | __Required__. The API key provided on your user profile page
id            | guid          | __Required__. The id of the submission.

### Get submissions

GET https://www.FormBucket.com/submissions.json

#### Example Response

```js
[{
  bucket: 'afbi23',
  created_on: '2015-01-24T12:23:32',
  data: [{
    // actual fields submitted
  }]
}]
```

### Get a realtime stream of submissions

GET https://www.FormBucket.com/submissions/events

Access a realtime stream of data with the industry standard Server Sent Events protocol.

Integrating this functionality into a supported browser is easy.

```js
var es = new EventSource("https://www.FormBucket.com/submissions/events");
es.onmessage = function (event) {
  console.log(event.data);
};
```  

#### Example Response

```js
:ok

data: { bucket: '12fdOd', created_on: '2015-01-24T12:23:32', data: [ /* actually form */ ]}

data: { bucket: '12fdOd', created_on: '2015-01-24T12:23:32', data: [ /* actually form */ ]}
```

### Get a realtime stream of submission for a form

GET https://www.FormBucket.com/submissions/:id/events

This is the same as the stream for all buckets, except that the results are filtered to a particular bucket.

---

## Error Codes

 ID  | Text
 --- | ----
 1   | Record not found.
 2   | Name is required.

 ## HTTP Status Codes

  ID    | Text
  ----- | ----
  200   | Success
  400   | Bad Request
  401   | Unauthorized
  403   | Forbidden
  404   | Not Found
  500   | Unexpected system error
