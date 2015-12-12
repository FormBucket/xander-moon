# FormBucket API

The FormBucket API enables integration with 3rd party system over
an industry standard REST API. Data is returned in JSON format.

## Forms

Reliably delivering powerful forms on static websites is our mission.

### Get a list of your forms

GET https://www.FormBucket.com/forms.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
API_KEY       | string        | __Required__. The API key provided on your user profile page

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

### Get a form

GET https://www.FormBucket.com/forms/:id.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
API_KEY       | string        | __Required__. The API key provided on your user profile page

#### Example request

GET https://www.FormBucket.com/forms/123.json?API_KEY=e705c568-8869-4ca2-8a58-78ba782423c4

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

### Create a new form

POST https://www.FormBucket.com/forms

#### Parameters

Name            |   Type        | Description
--------------- | ------------- | -----------
API_KEY         | string        | __Required__. The API key provided on your user profile page
name            | string        | __Required__. The name to identify the form.
email_to        | string        | __Optional__. A list of email address to email submissions. Default to address in user profile.
redirect_url    | string        | __Optional__. The URL to redirect a user after successful submission. Please not that this does not apply to submission sent over AJAX.  Default to blank.
webhook         | string        | __Optional__. A webhook is a URL that accepts submissions via a POST after they are recorded in our system. Default to blank.
enabled         | boolean       | __Optional__. Disable a form to stop new submissions without deleting your data. Default to true.
required_fields | string        | __Optional__. A comma separated list of fields that are required to record the submission in our system. If required fields are omitted then the submission is rejected and the request redirected back to the origin.

#### Example Responses

When the form is successfully created:

```js
{ "success": true }
```

When an error occurs:

```js
{ "code": 1, "error": "API_KEY is required." }
```


### Update a form

PUT https://www.FormBucket.com/forms/:id

#### Parameters

Accepts same parameters used to create the form.

#### Example responses

See example responses in "Create a new form"

### Delete a form

DELETE https://www.FormBucket.com/forms/:id

__WARNING.__ Deleting a form removes all submissions from our system.

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
API_KEY       | string        | __Required__. The API key provided on your user profile page

## Submissions

Submissions are actual form data entered by the users of your form.

### Get all submissions

GET https://www.FormBucket.com/submissions/:form_id.json

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
API_KEY       | string        | __Required__. The API key provided on your user profile page
form_id       | integer       | __Required__. The id of the form. This parameter is in the URL instead of the query string.
limit         | integer       | __Optional__. Restrict the number of submissions returned by the request. Default to 100.
offset        | integer       | __Optional__. Offset the result to enable paging. To keep it simple the first record is 1 and the last record is the number of submissions. Records are sorted by the time received.

#### Example Response

```JSON
[
  {
    "form_id":
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

The form may include any parameter needed to meet your data collection requirement.

If you wish to transmit images or other files then the form must include 'enctype="multipart/form-data"'.

The system is designed to capture small documents and images. The maximum file size is 5MB with a max per request of 10MB. If you need to transmit larger files then please contact customer support.

### Delete a submission

DELETE https://www.FormBucket.com/submission/:id

#### Parameters

Name          | Type          | Description
------------- | ------------- | -----------
API_KEY       | string        | __Required__. The API key provided on your user profile page
id            | guid          | __Required__. The id of the submission.

## Error Codes

 ID  | Text
 --- | ----
 1   | API_KEY is required.
 2   | Name is required.
 99  | System error.

 ## HTTP Status Codes

  ID    | Text
  ----- | ----
  200   | Success
  4xx   | Invalid request
  500   | Unexpected system error
