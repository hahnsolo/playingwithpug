//setting up http and the routing path 
const http = require('http');
const url =require('url');

//routing request handler
function handler(req, res) {

const realUrl = url.parse(req.url,true);

if(realUrl.pathname === '/')
{
res.writeHead(200,{'content-type':'text/plain'});
res.write('hellweeo, i am a web server');
res.end();
}
else if(realUrl.pathname ==='/time'){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write(new Date().toString());
    res.end();
}
else if(realUrl.pathname ==='/hello'){
    const name = realUrl.query.name;
    if(!name){
        res.writeHead(400, {'content-type':'text-plain'});
        res.end();
    }

    res.write(`hello ${name}`);
    res.end();
}
else 
{
    res.writeHead(404,{'content-type':'text/plain'});
    res.end();
}

}


const server = http.createServer(handler);
server.listen(3000); 


