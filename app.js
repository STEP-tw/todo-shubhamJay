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
  this.addSessionIdTo(req.body.userId,sessionId);
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
  let userToDos = this.getAllToDoTitlesOf(req.cookies.sessionId);
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
  let toDoWithTitle = templet.replace(/TODOTITLE/g,`${data.title}`);
  let toDoWithdescription = toDoWithTitle.replace("DESCRIPTION",
    `${data.description}`);
  let todoWithItems = toDoWithdescription.replace("TODODATA",`${JSON.stringify(data.items)|| ""}`)
  return todoWithItems;
}

const serveToDo = function(req,res){
  if (req.user && req.user.sessionId) {
    let allToDosOfUser = this.getAllToDoTitlesOf(req.cookies.sessionId);
    let requiredToDo = req.url.substr(1);
    if(allToDosOfUser.includes(requiredToDo)){
      let todoData = this.getRequiredToDoOf(req.cookies.sessionId,requiredToDo);
      res.statusCode =200;
      res.setHeader('content-type',"text/html");
      res.write(getToDoDataShow(toDoTemplet,todoData));
      res.end();
    }
  }
}

const hanldeEditedToDo = function(req,res){
  if(req.user && req.url.startsWith("/editToDo/")){
    let requiredToDo = req.url.split("/").slice(-1)[0];
    this.editToDoOf(req.cookies.sessionId,requiredToDo,req.body)
    pathToRedirect = req.body.title.replace(/\s/g,"00");
    res.redirect(`/${pathToRedirect}`);
  }
}

const sanitiseReqUrl = function(req,res){
  req.url = req.url.replace(/00/g,' ');
}

const handleDeletingToDo = function(req,res){
  if(req.user && req.url.startsWith("/delete/")){
    let requiredToDo = req.url.split("/").slice(-1)[0];
    this.deleteToDoOf(req.cookies.sessionId,requiredToDo);
    res.redirect(`/homePage.html`);
  }
};

let todoApp = new ToDoApp();

let app = Webapp.create();

app.preUse(getUserInReq.bind(todoApp));
app.preUse(sanitiseReqUrl);
app.preUse(handleUserWithOutLogIn);
app.preUse(serveSlash);
app.preUse(serveToDo.bind(todoApp));
app.get("/logOut",handleLogOut);
app.get('/getAllToDo',serveToDoTitles.bind(todoApp));
app.post('/logIn',handleLogIn.bind(todoApp));
app.post('/newToDo',handleNewToDo.bind(todoApp));
app.postUse(serveStaticFiles);
app.postUse(handleDeletingToDo.bind(todoApp));
app.postUse(hanldeEditedToDo.bind(todoApp))
app.postUse(serveFileNotFound);

module.exports = app;
