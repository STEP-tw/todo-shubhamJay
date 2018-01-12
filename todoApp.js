const User = require('./user.js');
const fs = require('fs');

const ToDoApp = function() {
  this.allUsers = [new User("shubham","shubham","shubham")]
}

ToDoApp.prototype.isValidUser = function(userId, password) {
    let user = this.allUsers.find((u)=>u.userId == userId) || {}
  return user.password == password;
}

ToDoApp.prototype.getUser = function (userId) {
  return this.allUsers.find((u)=>u.userId == userId) || {};
};

ToDoApp.prototype.getUserBySessionId = function (sessionId) {
  return this.allUsers.find((u)=>u.sessionId == sessionId) || {};
};

ToDoApp.prototype.addSessionIdToUser = function(userId, sessionId) {
  let user = this.allUsers[userId] || {};
  user.addSessionId(sessionId);
}

ToDoApp.prototype.addToDo = function (sessionId,newToDo) {
  let user = this.getUserBySessionId(sessionId);
  user.addToDo(newToDo);
  this.storeData();
};

ToDoApp.prototype.storeData = function () {
  fs.writeFile("./data/toDo.json",JSON.stringify(this.allUsers)|| [],(err)=>{
    if(err)console.log(err);
  })
};

ToDoApp.prototype.loadData = function () {
  fs.readFile("./data/toDo.json",(err,data)=>{
    if(err)console.log(err);
    if(data){
      let toDos = JSON.parse(data.toString());
      this.allUsers = this.allUsers.concat(toDos);
    }
  })
};

module.exports = ToDoApp;
