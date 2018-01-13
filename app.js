const Webapp = require('./webapp.js');
const fs = require('fs');
const ToDoApp = require('./todoApp.js');
const toDoTemplet = fs.readFileSync("./public/toDoTemplet.html","utf8");

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
  let sessionId = req.cookies.sessionId;
  let user = this.getUserBySessionId(sessionId) || {};
  if(sessionId && user)req.user = user;
};

const serveToDoTitles = function(req,res){
  let userToDos = req.user.getAllToDoTitles();
  res.write(JSON.stringify(userToDos));
  res.end();
}

const handleNewToDo = function(req,res){
  let toDo = req.body;
  this.addToDo(req.cookies.sessionId,toDo);
  res.redirect('/homePage.html');
}

const handleUserWithOutLogIn = function(req,res){
  if(req.urlIsOneOf(["/homePage.html","/createNewToDo.html"]) && !req.user){
    res.redirect('./index.html');
  }
}

const getToDoDataShow = function(templet,data){
  let toDoWithTitle = templet.replace('TODOTITLE',`${data.title}`);
  let toDoWithdescription = toDoWithTitle.replace("DESCRIPTION",
    `${data.description}`);
  let todoWithItems = toDoWithdescription.replace("TODODATA",`${JSON.stringify(data.items)|| ""}`)
  return todoWithItems;
}

const serveToDo = function(req,res){
  debugger;
  if (req.user && req.user.userId && req.user.sessionId) {
    let allToDosOfUser = req.user.getAllToDoTitles();
    let requiredToDo = req.url.substr(1);
    if(allToDosOfUser.includes(requiredToDo)){
      let todoData = req.user.getToDo(requiredToDo);
      res.statusCode =200;
      res.setHeader('content-type',"text/html");
      res.write(getToDoDataShow(toDoTemplet,todoData));
      res.end();
    }
  }
}


let todoApp = new ToDoApp();
// todoApp.loadData();

let app = Webapp.create();

app.preUse(getUserInReq.bind(todoApp));
app.preUse(handleUserWithOutLogIn);
app.preUse(serveSlash);
app.preUse(serveToDo);
app.get("/logOut",handleLogOut);
app.get('/getAllToDo',serveToDoTitles);
app.post('/logIn',handleLogIn.bind(todoApp));
app.post('/newToDo',handleNewToDo.bind(todoApp));
app.postUse(serveStaticFiles);
app.postUse(serveFileNotFound);

module.exports = app;
