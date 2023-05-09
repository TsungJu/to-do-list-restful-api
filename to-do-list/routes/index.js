//var express = require('express');
const express = require('express');
//var router = express.Router();
const router = express.Router();

const counter = 0;
const todolist = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
