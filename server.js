// content of index.js
const http = require('http')
const port = 3366
var i = 1;
const requestHandler = (request, response) => {
  try{
    var ip = request.getHeader('x-forwarded-for') || request.connection.remoteAddress;
  }catch(e){
    var ip = "Not found!";
  }
  console.log("Request nr: " + i++ + " URL: "+request.url + " IP: " + ip);
  response.writeHead(200, {'Content-Type': 'image/jpeg'} );
  response.end(fs.readFileSync(__dirname+'/img.jpg'));
}

const server = http.createServer(requestHandler)

server.listen(port,"127.0.0.1", (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
