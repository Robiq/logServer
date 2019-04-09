// content of index.js
const http = require('http')
const port = 3366
var i = 1;
const requestHandler = (request, response) => {
  try{
    var ip = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;
    console.log(request.headers['x-forwarded-for']);
    console.log(request.headers['x-real-ip']);
    console.log(request.connection.remoteAddress);
  }catch(e){
    console.error("Error!", e);
    var ip = "Not found!";
  }
  console.log("Request nr: " + i++ + " URL: "+request.url + " IP: " + ip);
  response.writeHead(200);//, {'Content-Type': 'image/jpeg'} );
  response.end("ok\n");//fs.readFileSync(__dirname+'/img.jpg'));
}

const server = http.createServer(requestHandler)

server.listen(port,"127.0.0.1", (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
