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

const serveSlash = (req,res) =>{
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

const actionOnLogInFailed = function(res){
  res.setHeader('Set-Cookie',`logInFailed=1; Max-Age=5`);
  res.redirect('/index.html');
}

const actionOnLogIn = function(req,res){
  let sessionId = new Date().getTime();
  let user = this.getUser(req.body.userId);
  user.addSessionId(sessionId);
  res.setHeader('Set-Cookie',`sessionId=${sessionId}`);
  res.redirect('/homePage.html');
}

const handleLogIn = function(req,res){
  if (this.isValidUser(req.body.userId,req.body.password)) {
    actionOnLogIn.call(this,req,res);
  } else {
    actionOnLogInFailed(res)
  }
}

const handleLogOut = function(req,res){
  res.setHeader('Set-Cookie',`sessionId=0; Max-Age=-1`);
  res.redirect('/index.html');
}

const getUserInReq = function(req,res){
  debugger;
  let sessionId = req.cookies.sessionId;
  let user = this.getUserBySessionId(sessionId)
  if(sessionId && user)req.user = user;
};

const serveToDoList = function(req,res){
  debugger;
  let userToDos = req.user.getAllToDo();
  console.log(userToDos);
  res.write(JSON.stringify(userToDos));
  res.end();
}

let todoApp = new ToDoApp();
let app = Webapp.create();
app.preUse(getUserInReq.bind(todoApp));
app.preUse(serveSlash);
app.get("/logOut",handleLogOut);
app.post('/logIn',handleLogIn.bind(todoApp));
app.get('/getAllToDo',serveToDoList);
app.postUse(serveStaticFiles);
app.postUse(serveFileNotFound);

module.exports = app;
