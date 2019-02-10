//setting up http and the routing path 
const http = require('http');
const url =require('url');

//routing request handler
function handler(req, res) {

const realUrl = url.parse(req.url,true);

// If there is a default path name 
if(realUrl.pathname === '/')
{
res.writeHead(200,{'content-type':'text/plain'});
res.write('hellweeo, i am a web server');
res.end();
}//if there is a /time, provide a time 
else if(realUrl.pathname ==='/time'){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write(new Date().toString());
    res.end();
}// if the user goes to /hello and has a param 'name'
else if(realUrl.pathname ==='/hello'){
    const name = realUrl.query.name;
    //if the name param is actually not passed
    if(!name){
        res.writeHead(400, {'content-type':'text-plain'});
        res.end();
    }
    //write a request with a name param 
    res.write(`hello ${name}`);
    res.end();
}
//catch all if none of the above have been met. display a 400 
else 
{
    res.writeHead(404,{'content-type':'text/plain'});
    res.end();
}

}


const server = http.createServer(handler);
server.listen(3000); 