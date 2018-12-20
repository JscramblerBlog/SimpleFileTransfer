var express = require('express');
var router = express.Router();
var User = require('../model/user');
var bcrypt = require('bcrypt');

/** Login Route */


router.post('/', function(req, res, next) { 
  User.findAll({
    attributes: ["username", "password", "uid"],
    where: {
      username: req.body.username
    }
  }).then(dbQ => {     
      if(dbQ.length > 0) {
        bcrypt.compare(req.body.password, dbQ[0].dataValues.password, function(err, result) {
          if (result == true){
            res.send({status: true, uid: dbQ[0].dataValues.uid, msg: 'Login Success'});
          } else {
            res.send({status: false, msg: 'Incorrect Password'});
          }              
      });
    } else {
      res.send({status: false, msg: 'User not found'}); 
    }        
  });
});

module.exports = router;
