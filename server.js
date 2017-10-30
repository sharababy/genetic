var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var baseDirectory = __dirname   // or whatever base directory you want

var cross = require("./cross.js")

var port = 3003

var server = http.createServer(function (request, response) {
   try {
     var requestUrl = url.parse(request.url)
     var fsPath = baseDirectory+path.normalize(requestUrl.pathname)
     
     if (request.url[1] === '=') {

        var exp = request.url.substring(2);

        console.log(exp);
        
        var circuit = cross.startEvolution(exp)

        response.end(JSON.stringify(circuit))


     }
     else{
        if (request.url == "/") {
            fsPath = "index.html";
        }
            
         var fileStream = fs.createReadStream(fsPath)
         fileStream.pipe(response)
         fileStream.on('open', function() {
             response.writeHead(200)
         })
         fileStream.on('error',function(e) {
             response.writeHead(404)     // assume the file doesn't exist
             response.end()
         })
        
       }
   } catch(e) {
     response.writeHead(500)
     response.end()     // end the response so browsers don't hang
     console.log(e.stack)
   }
}).listen(port,function(){console.log("Simulator running on http://localhost:3003")})



module.exports = {server}