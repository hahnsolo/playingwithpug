//setting up http and the routing path 
const http = require('http');
const url =require('url');

//routing request handler
function handler(req, res) {

const realUrl = url.parse(req.url,true);

res.setHeader('x-server-date', new Date());

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
// allow to process if the url have an id base or name 
// looks to see if the url starts with /user/
else if(realUrl.pathname.startsWith('/user/')){
    // creates a regex to pull out the value from the page after /users/
    const regex = new RegExp('\/user\/(.+)');
    const matching = regex.exec(realUrl.pathname);
    //if there is no value then call a 400 repsonse
    if(!matching ||!matching[1]){
        res.writeHead(400, {'content-type':'text-plain'});
        return res.end();
    }
     //write a request with a name param 
     res.write(`profile of ${matching[1]}`);
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