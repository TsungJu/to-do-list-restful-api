//var express = require('express');
const express = require('express');
//var router = express.Router();
const router = express.Router();

var counter = 0;
var todolist = {};

router.get('/todo/:id', function(req, res, next) {
  var id = req.params.id,
  item = todolist[id];

  if ( typeof item !== 'string' ) {
    res.writeHead(404);
    res.end('\n');
    return;
  }

  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end(item);
});

router.get('/list', function(req,res,next) {
  var item, listString;
  var itemlist = [];

  for ( id in todolist ) {
	if ( !todolist.hasOwnProperty(id) ) {
      continue;
    }
    item = todolist[id];

    if ( typeof item !== 'string' ) {
      continue;
    }

    itemlist.push( item );
  }
  //console.log(req.params.id)
  //res.send('hello world');
  listString=JSON.stringify(itemlist);
  res.writeHead( 200, {'Content-Type' : 'text/plain'});
  res.end(listString);
});

router.post('/todo', function(req,res,next) {
  var id = counter += 1;
  var item = req.body.todo;
    
  todolist[id] = item;
  res.writeHead(201,{'Content-Type':'text/plain','Location':'/todo/'+id});
  res.end('Item:'+item);
});

router.delete('/todo/:id', function(req,res,next) {
  var id = req.params.id;

  if ( typeof todolist[id] !== 'string' ) {
	console.log('Item not found',id);
	res.writeHead(404);
	res.end('\n');
    return;
  }

  todolist[id] = undefined;
  res.writeHead( 204, {'Content-Type' : 'text/plain'});
  res.end('');
});

router.put('/todo/:id', function(req,res,next) {
  var id = req.params.id, item = req.body.todo;

  if ( typeof todolist[id] !== 'string' ) {
    res.writeHead(404);
    res.end('\n');
    return;
  }

  todolist[id] = item;
  res.writeHead( 201, {'Content-Type' : 'text/plain','Location' : '/todo/' + id});
  res.end( item );
});

module.exports = router;
