var
  http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs');

var mimeTypes = {
  "html": 'text/html',
  "js": 'application/javascript'
};

var angularNoCaptchaFile = '/src/angular-no-captcha.js';
var index = '/example/index.html';


http
  .createServer(function (req, res){

    function serveFile(mimeType, fileName){
      if(mimeType && fileName && fs.existsSync(fileName)) {
        res.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.send('404 - File not found!\n');
        return;
      }
    }

    // serve angular no captcha file
    if(req.url === angularNoCaptchaFile) {
      serveFile(mimeTypes.js, path.join(process.cwd(), angularNoCaptchaFile));
    }

    // serve index
    if(req.url === '/') {
      serveFile(mimeTypes.html, path.join(process.cwd(), index));
    }

  })
  .listen(1337);

console.log('Listening http://localhost:1337');