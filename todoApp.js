const User = require('./user.js');

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

module.exports = ToDoApp;
