var http = require('http');
/*var fs = require('fs');*/
var Router = require('router'),router;
var counter=0,todolist={};
var BodyParser=require('body-parser');
router = new Router();

//create Server
var server = http.createServer(function (request, response) {
	router( request, response, function( error ) {
    /*if ( !error ) {
      response.writeHead( 404 );
    } else {
      // Handle errors
      console.log( error.message, error.stack );
      response.writeHead( 400 );
    }
    response.end( 'RESTful API Server is running!' );*/
  });
	/*fs.readFile('welcome.html',function(err,data){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		return response.end();
	});*/
});
var port = process.env.PORT || 8888;
server.listen(port);
//router use body parser (text)
router.use(BodyParser.text());

//POST create todo item
function createItem(request,response){
	var id=counter+=1,item=request.body;

	todolist[id]=item;
	response.writeHead(201,{'Content-Type':'text/plain','Location':'/todo/'+id});
	response.end('Item:'+item);
}

//get website
function web(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	response.end('Hello Restful API !!');
}

//read item
function readItem( request, response ) {
	 var id = request.params.id,
	 item = todolist[id];

	 if ( typeof item !== 'string' ) {
		 response.writeHead(404);
		 response.end('\n');
		 return;
   }

	 response.writeHead(200,{'Content-Type':'text/plain'});
	 response.end(item);
}

//delete Item
function deleteItem( request, response ) {
	 var id = request.params.id;

	 if ( typeof todoList[id] !== 'string' ) {
	 console.log('Item not found',id);
	 response.writeHead(404);
	 response.end('\n');
	 return;
	 }

	 todolist[id] = undefined;
	 response.writeHead( 204, {'Content-Type' : 'text/plain'});
	 response.end('');
}

//read todo list
function readlist(request,response){
	var item,itemlist=[],liststring;

	for(id in todolist){
		if ( !todolist.hasOwnProperty(id) ) {
      continue;
    }
    item = todolist[id];

    if ( typeof item !== 'string' ) {
      continue;
    }

    itemlist.push( item );
	}

  liststring=JSON.stringify(itemlist);
	response.writeHead( 200, {'Content-Type' : 'text/plain'});
	response.end(liststring);
}

//update item
function updateItem( request, response ){
  var id = request.params.id, item = request.body;

  if ( typeof todolist[id] !== 'string' ) {
    response.writeHead(404);
    response.end('\n');
    return;
  }

  todolist[id] = item;
  response.writeHead( 201, {'Content-Type' : 'text/plain','Location' : '/todo/' + id});
  response.end( item );
}

router.put( '/todo/:id', updateItem );
router.get('/list',readlist);
router.delete('/todo/:id', deleteItem );
router.get('/todo/:id',readItem);
router.post('/todo',createItem);
router.get('',web);
