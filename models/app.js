const Webapp = require('./webapp.js');
const fs = require('fs');
const ToDoApp = require('./todoApp.js');
const toDoTemplet = fs.readFileSync("./public/toDoTemplet","utf8");

const getContentType = function(path){
  let fileExt = path.split(".").slice(-1)[0];
  let contentTypes = {
    'js':"text/javascript",
    'img':'img/gif',
    'css':'text/css',
  }
  return contentTypes[fileExt] || 'text/html';
}

const serveSlash = (req,res) =>{
  if(req.url == "/"){
    req.url = '/index'
  }
}

const serveStaticFiles = (req,res)=>{
  if(!res.finished && fs.existsSync("./public"+req.url)){
    res.statusCode =200;
    res.setHeader('Content-Type',getContentType(req.url));
    res.write(fs.readFileSync("./public"+req.url))
    res.end();
  };
}

const actionOnLogInFailed = function(res){
  res.setHeader('Set-Cookie',`logInFailed=1; Max-Age=5`);
  res.redirect('/index');
}

const actionOnLogIn = function(req,res){
  let sessionId = new Date().getTime();
  this.addSessionIdTo(req.body.userId,sessionId);
  res.setHeader('Set-Cookie',`sessionId=${sessionId}`);
  res.redirect('/homePage');
}

const handleLogIn = function(req,res){
  if (this.isValidUser(req.body.userId,req.body.password)) {
    actionOnLogIn.call(this,req,res);
  } else {
    actionOnLogInFailed(res)
  }
}

const handleLogout = function(req,res){
  res.setHeader('Set-Cookie',`sessionId=0; Max-Age=-1`);
  res.redirect('/index');
}

const getUserInReq = function(req,res){
  let sessionId = req.cookies.sessionId;
  let user = this.getUserBySessionId(sessionId);
  if(sessionId && user)req.user = user;
};

const serveToDoTitles = function(req,res){
  res.write(JSON.stringify(req.user.getAllToDoTitles()));
  res.end();
}

const handleNewToDo = function(req,res){
  req.user.addToDo(req.cookies.sessionId,req.body);
  res.redirect('/homePage');
}

const restrictLoggedOutUser = function(req,res){
  if(req.urlIsOneOf(["/homePage","/createNewToDo",'/logout']) && !req.user){
    res.redirect('/index');
  }
}

const restrictLoggedinUser = function(req,res){
  if (req.urlIsOneOf(['/','/index'])&& req.user) {
    res.redirect('/homePage');
  }
};

const getToDoDataShow = function(templet,data){
  let toDoWithTitle = templet.replace(/TODOTITLE/g,`${data.title}`);
  let toDoWithdescription = toDoWithTitle.replace("DESCRIPTION",
    `${data.description}`);
  let todoWithItems = toDoWithdescription.replace("TODODATA",`${JSON.stringify(data.items)|| ""}`)
  return todoWithItems;
}

const serveToDo = function(req,res){
  res.statusCode = 200;
  res.setHeader('Content-Type',"text/html");
  let dataToShow = getToDoDataShow(toDoTemplet,req.toDo);
  res.write(dataToShow);
  res.end();
}

const handleEditedToDo = function(req,res){
  req.user.editToDo(req.toDoID,req.body);
  res.redirect(`/toDo/${req.toDoID}`);
}

const getToDoInReq = function(req,res){
  if(req.user && req.url.startsWith("/toDo/")){
    req.toDoID = req.url.split("/")[2];
    req.toDo = req.user.getToDo(req.toDoID);
    req.url = "/toDo";
  };
}

const handleDeletingToDo = function(req,res){
  req.user.deleteToDo(req.toDoID);
  res.redirect(`/homePage`);
};

const mockUser =function() {
    this.addUser("shubham","shubham","shubham");
    this.addSessionIdToUser("shubham",1001);
    this.addToDo(1001,{title:"atHome",description:"notDone",1:"go Home",2:"sleep"});
};

let todoApp = new ToDoApp();
mockUser.call(todoApp);

let app = Webapp.create();

app.preUse(getUserInReq.bind(todoApp));
app.preUse(getToDoInReq);
app.preUse(restrictLoggedOutUser);
app.preUse(restrictLoggedinUser);
app.preUse(serveSlash);
app.get("/logout",handleLogout);
app.get('/getAllToDo',serveToDoTitles.bind(todoApp));
app.get("/toDo",serveToDo.bind(todoApp));
app.post('/logIn',handleLogIn.bind(todoApp));
app.post('/newToDo',handleNewToDo.bind(todoApp));
app.post('/toDo',handleEditedToDo.bind(todoApp));
app.delete('/toDo',handleDeletingToDo.bind(todoApp));
app.postUse(serveStaticFiles);

module.exports = app;
