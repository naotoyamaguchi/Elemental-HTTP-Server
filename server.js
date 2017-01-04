// jshint esversion: 6

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const PORT = process.env.PORT || 3000;
const path = "./public";



const sendContent = (res, content) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(content);
  res.end();
};

// const fileNotFoundErrorHandler = (res) => {
//   res.statusCode = 500;
//   res.end('Server is broken');
// };


const server = http.createServer( (req, res) => {
  var myFilez = [];
  let parsedData = '';
  var myElementz = [];
  var updatedList = '';

  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    parsedData = qs.parse(chunk);
  });

  req.on('end', () => {
    fs.writeFile(`./public/${parsedData.elementName}.html`, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${parsedData.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${parsedData.elementName}</h1>
  <h2>H</h2>
  <h3>Atomic number 2</h3>
  <p>${parsedData.elementName} is a chemical element with symbol ${parsedData.elementSymbol} and atomic number ${parsedData.elementAtomicNumber}. ${parsedData.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`);

    fs.readdir(path, function (err, files){
      for(let i = 0; i < files.length; i++){
        if(files[i] !== ".keep" && files[i] !== "404.html" && files[i] !== "css" && files[i] !== "index.html" && files[i] !== "undefined.html"){
        myElementz.push(files[i]);
        }
      }
      for(let i = 0; i < myElementz.length; i++){
        updatedList+=`<li>
        <a href="/${myElementz[i]}">${myElementz[i].slice(0, -5)}</a>
      </li>`;
        }
          fs.writeFile(`./public/index.html`, `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>The Elements</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <h1>The Elements</h1>
          <h2>These are all the known elements.</h2>
          <h3>These are ${myElementz.length}</h3>
          <ol id="elementList">
            ${updatedList}
          </ol>
        </body>
        </html>`);
      if(err){
        throw err;
      }
      fs.readFile("./public/"+files[files.indexOf(req.url.substr(1))] || '', (err, content) => {
        if(err){
          res.statusCode = 500;
          res.write("server fault occured, and I can't figure out why this is happening... but it workS?");
          res.end();
          return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write(content);
        res.end();
      });
    });
  });
});

  
server.listen(PORT, ()=>{
  console.log("server is listening on : ", PORT);
});