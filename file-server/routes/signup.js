var express = require('express');
var router = express.Router();
var User = require('../model/user');
var bcrypt = require('bcrypt');
var fs = require('fs');

/** Create user */
router.post('/', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    res.send({status: false, msg: 'Username or password not found' });
  }
  bcrypt.hash(req.body.password, 10, function(err, hash) {    
    User
    .create({ username: req.body.username, password: hash })
    .then(user => {      
      if (!fs.existsSync('storage/'+user.get('uid'))){
        fs.mkdirSync('storage/'+user.get('uid'));
    }
      res.send({status: true, msg: 'User created', uid: user.get('uid')});  
    }).catch(err => {
      res.send({status: false, msg: err });
    })
  });
});

module.exports = router;
