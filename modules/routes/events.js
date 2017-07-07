var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/dateData');

var eventSchema = new mongoose.Schema({
  "startDate": String,
  "endDate": String,
  "title": String,
  "description": String,
  "image": String,
  "userID": String,
  "info": String,
  "location": {
    "city": String,
    "street": String,
    "zip": String
  }
});

var eventModel = mongoose.model('events', eventSchema);

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  eventModel.remove({
    _id: req.params.id
  }).then(function(data) {
    res.send('success');
  });
})

router.post('/', function(req, res) {
  console.log('db post: ', req.body.title);
  var recordToAdd = {
        startDate: req.body.start,
        endDate: req.body.end,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        userID: req.body.userID,
        info: req.body.info,
        location: req.body.location
      };
  console.log(recordToAdd);
  var newRecord = eventModel(recordToAdd);
  newRecord.save();
  res.send('success')
});

router.get('/:id', function(req, res){
  console.log(req.params.id);
  eventModel.find({
    userID: req.params.id
  }).then(function(data) {
    res.send(data);
  });
})

module.exports = router;
