var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

//user list page
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist": docs
    });
  })
});

router.get('/newuser', function(req, res){
    res.render('newuser', {title: 'Add New User'});
});

//post to add user service
router.post('/adduser', function(req, res){
  //设置数据库参数
  var db = req.db;
  //从表单中获得数据
  var username = req.body.username;
  var useremail = req.body.useremail;
  //设置collenction
  var collection = db.get('usercollection');

  //submit to db
  collection.insert({
    "username": username,
    "email": useremail
  }, function(err, doc){
    if(err){
      res.send("There was a problem adding the information to the database.");
    }else{
      res.redirect('/userlist');
    }
  });
});

module.exports = router;
