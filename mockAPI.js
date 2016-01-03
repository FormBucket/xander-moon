'use strict';

// Implement the FormBucket API with static return values.
var buckets = [{
  id: "1234567",
  email_to: "peter@functionfoundry.com",
  user_id: "56843f5d1490158244dff14f",
  name: "FormBucket Contact Form",
  enabled: true,
  redirect_url: "https://formbucket-development.elasticbeanstalk.com/thank-you",
  webhooks: [
    "http://formbucket-development.elasticbeanstalk.com/f/hook",
    "https://zapier.com/hooks/catch/3pv96h/"
  ],
  required_fields: [],
  auto_responder: false
}, {
  id: 'foobar'
}]

var submissions = [{
  bucket_id: 'ff4fu3',
  user_id: '1234'
}]

// create an express middleware that sends a static value
function send(value) {
  return function(req, res) {
    console.log('mockapi', req.method, req.path, req.params)
    res.send(value)
  }
}

// a function to load the mocked APIs
function mockAPI(app) {
  app.get( '/bucket-list.json', send(buckets) )
  app.get( '/bucket/:id.json', send('TBD') )
  app.post( '/bucket-list', send('TBD') )
  app.put( '/bucket/:id', send('TBD') )
}

module.exports = mockAPI
