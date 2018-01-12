const ToDoApp = function() {
  this.allUsers = {
    shubham: {
      name: "shubham",
      userId: 'shubham',
      password: 'shubham',
      toDo: []
    }
  }
}

ToDoApp.prototype.isValidUser = function(userId, password) {
  let user = this.allUsers[userId] || {};
  return user.password == password;
}

module.exports = ToDoApp;
