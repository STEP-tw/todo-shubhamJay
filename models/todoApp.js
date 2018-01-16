const User = require('./user.js');
const fs = require('fs');

const ToDoApp = function() {
  this.allUsers = [];
}

ToDoApp.prototype.addUser = function (name,userId,password) {
  let newUser = new User(name,userId,password);
  this.allUsers.push(newUser);
};

ToDoApp.prototype.isValidUser = function(userId, password) {
  let user = this.getUser(userId);
  return user.password == password;
}

ToDoApp.prototype.getUser = function(userId) {
  return this.allUsers.find((u) => u.userId == userId) || {};
};

ToDoApp.prototype.getUserBySessionId = function(sessionId) {
  return this.allUsers.find((u) => u.sessionId == sessionId);
};

ToDoApp.prototype.addSessionIdToUser = function(userId, sessionId) {
  let user = this.allUsers.find((u) => u.userId == userId);
  user.addSessionId(sessionId);
}

ToDoApp.prototype.addToDo = function(sessionId, newToDo) {
  let user = this.getUserBySessionId(sessionId);
  user.addToDo(newToDo);
};

ToDoApp.prototype.addSessionIdTo = function (userId,sessionId) {
  let user = this.getUser(userId);
  user.addSessionId(sessionId);
};

ToDoApp.prototype.getAllToDoTitlesOf = function (sessionId) {
  let user = this.getUserBySessionId(sessionId);
  return  user.getAllToDoTitles();
};

ToDoApp.prototype.getRequiredToDoOf = function (sessionId,requiredToDo) {
  let user = this.getUserBySessionId(sessionId);
  return user.getToDo(requiredToDo);
};

ToDoApp.prototype.editToDoOf = function (sessionId,requiredToDo,toDoBody) {
  let user = this.getUserBySessionId(sessionId);
  user.editToDo(requiredToDo,toDoBody);
};

ToDoApp.prototype.deleteToDoOf = function (sessionId,toDoToDelete) {
  let user = this.getUserBySessionId(sessionId);
  user.deleteToDo(toDoToDelete);
};
//
// ToDoApp.prototype.storeData = function() {
//   fs.writeFile("./data/toDo.json", JSON.stringify(this.allUsers) || [], (err) => {
//     if (err) console.log(err);
//   })
// };
//
// ToDoApp.prototype.loadData = function() {
//   fs.readFile("./data/toDo.json", (err, data) => {
//     if (err) console.log(err);
//     if (data) {
//       let toDos = JSON.parse(data.toString());
//       this.allUsers = this.allUsers.concat(toDos);
//     }
//   })
// };

module.exports = ToDoApp;
