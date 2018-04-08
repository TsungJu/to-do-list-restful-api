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
router.post('/todo',createItem);
