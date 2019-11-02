// content of index.js
const http = require('http')
const fs = require('fs')
require('log-timestamp');
const port = 3366
var i = 1;

const requestHandler = (request, response) => {
  try{
    var ip = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;
    var ip_fw = request.headers['x-forwarded-for'];
    var ip_real = request.headers['x-real-ip'];
    /*
    console.log(request.headers['x-forwarded-for']);
    console.log(request.headers['x-real-ip']);
    console.log(request.connection.remoteAddress);
    */
  }catch(e){
    console.error("Error!", e);
    var ip = "Not found!";
  }
  var cookie = request.headers['cookie'] || "None";
  console.log("\n[+] Request nr: " + i++ + "\n	[*] URL: "+request.url + "\n	[*] Cookies: " + cookie+ "\n	[*] IP: " + ip + " Fw_IP: " + ip_fw + " Real_ip: " + ip_real + "\n");
  if(request.url == "/img"){
	  response.writeHead(200, {"Content-Type": "image/jpeg"});
	  response.write(fs.readFileSync(__dirname+'/Panda_hut.jpg'));
	  response.end();
  }else{
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(fs.readFileSync(__dirname+'/base.html'));
	  response.end();
  }
}

const server = http.createServer(requestHandler)

server.listen(port,"127.0.0.1", (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
