'use strict';

// Implement the FormBucket API with static return values.
var buckets = [{
  id: 'ff4fu3',
  name: 'FormBucket Homepage'
}, {
  id: 'abij6d',
  name: 'Contact Form'
}, {
  id: 'abij6d',
  name: 'Survey Form'
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
  app.get( '/buckets.json', send(buckets) )
  app.get( '/buckets/:id.json', send('TBD') )
  app.post( '/buckets', send('TBD') )
  app.put( '/buckets/:id', send('TBD') )
}

module.exports = mockAPI
