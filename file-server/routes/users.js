var express = require('express');
var router = express.Router();
var multer = require('multer');
var User = require('../model/user');
var fs = require('fs');
var async = require("async");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
}); 
var upload = multer({ storage: storage })

/** Upload File Route */

router.post('/:id/upload', upload.single('file'), function(req, res, next) {
  if (!req.file) {
    console.log("No file received");    
    return res.send({
      success: false,
      msg: "Error Uploading files"
    });
  } else {
    console.log('file received');
    let relpath = 'storage/'+req.params.id;
    Promise.all([getStorageSpace(relpath), getStorageLimit(req.params.id)]).then(result => {
      if (result[1].quota - result[0].space > req.file.size){
        fs.rename('uploads/'+ req.file.originalname, relpath+'/'+req.file.originalname, function (err) {
          if (err) {
            return res.send({
              success: false,
              msg: "Error Uploading files"
            });
          }   
          return res.send({
            success: true,
            msg: "File Uploaded"
          })    
      });
      } else {
        fs.unlinkSync('uploads/'+req.file.originalname);
        return res.send({
          success: false,          
          msg: "Storage Limit Exceeded"
        });
      }  
      }).catch(err => {
        res.send({status: false, msg: err})
      })
  } 
});
/** Download File Route */

router.get('/:id/download/:filename', function(req, res, next) {
  var file = 'storage/'+req.params.id + '/' + req.params.filename;
  res.download(file);
});

/** Increase user quota */


router.post('/:id/increasequota', function(req, res, next) {
  User.update({
    quota: req.body.quota,
  }, {
    where: {
      uid: req.params.id         
    }
  }).then(response => {
    res.send({status: true, msg: "Quota Increased"});

  }).catch(err => {
    res.send({status: false, msg: err});
  });  
});

/** User Details Route */

router.get('/:id/details', function(req, res, next) {  
  let relpath = 'storage/'+req.params.id;
  Promise.all([getStorageSpace(relpath), getStorageLimit(req.params.id)]).then(result => {    
    res.send({storageLimit: result[1].quota, occupiedSpace: result[0].space, fileNames: result[0].fileNames, remainingSpace: result[1].quota- result[0].space});
  }).catch(err => {
    res.send({status: false, msg: err})
  })
});


/** Helper functions for Calculating storage space */

function getStorageSpace(relpath) {
  let space = 0;
  let fileNames = [];
  let promise = new Promise(function (resolve, reject) {
    fs.readdir(relpath, function (err, items) {
      if (err){
        reject(err);
      } 
      
      if(items){ 
      fileNames = items;     
      let filesArr = items.map(function (val) {
        return relpath + '/' + val;
      });
      async.map(filesArr, fs.stat, function (err, results) {
        
        for (let i = 0; i < results.length; i++) {
          if (err) {
            reject(err);
          }
          space = space + results[i].size;
        }
        resolve({fileNames: fileNames, space: space });
      });
    } else {
      resolve({fileNames: [], space: 0 });
    }
    });
  });
  return promise;
}

function getStorageLimit(uid){ 
  let promise = new Promise(function (resolve, reject) { 
    User.findAll({
      attributes: ["quota"],
      where: {
        uid: uid
      }
    }).then(dbQ => {      
      if(dbQ.length < 1) {
        reject({msg:"Quota Not Found" ,quota: undefined})
      } else {
        resolve({msg: "Success", quota: dbQ[0].dataValues.quota});
      }      
    }).catch(err => {
      reject(err);
    });
  }); 
  return promise;  
}

module.exports = router;
