const Webapp = require('./webapp.js');
const fs = require('fs');
const ToDoApp = require('./todoApp.js');

const getContentType = function(path){
  let fileExt = path.split(".").slice(-1)[0];
  let contentTypes = {
    'js':"text/javascript",
    'html':'text/html',
    'img':'img/gif',
    'css':'text/css',
  }
  return contentTypes[fileExt];
}

const serveSlash = (req) =>{
  if(req.url == "/"){
    req.url = '/index.html'
  }
}

const serveFileNotFound = (req,res)=>{
  if(!res.finished){
    res.statusCode = 404;
    res.write("file not Found");
    res.end();
  }
}

const serveStaticFiles = (req,res)=>{
  if(!res.finished && fs.existsSync("./public"+req.url)){
    res.statusCode =200;
    res.setHeader('content-type',getContentType(req.url));
    res.write(fs.readFileSync("./public"+req.url))
    res.end();
  };
}

const handleLogIn = function(req,res){
  this.isValidUser(req.body.userId,req.body.password)
  res.write("logIn successful");
  res.end();
}


let todoApp = new ToDoApp();
let app = Webapp.create();
app.preUse(serveSlash);
app.post('/logIn',handleLogIn.bind(todoApp))
app.postUse(serveStaticFiles);
app.postUse(serveFileNotFound);

module.exports = app;
