const ToDo = require("./ToDo.js");

const User = function(name, userId, password) {
  this.name = name;
  this.userId = userId;
  this.password = password;
  this.toDoList = [];
}

User.prototype.addSessionId = function(sessionId) {
  this.sessionId = sessionId;
};

User.prototype.getAllToDoTitles = function() {
  let allToDoTiTles = this.toDoList.map((t) => t.title);
  return allToDoTiTles;
}

User.prototype.convertToDoInRequiredForm = function (body) {
  let todo = new ToDo(body.title,body.description);
  todo.addMultipleItems(body);
  return todo;
};

User.prototype.addToDo = function(todo) {
  this.toDoList.push(this.convertToDoInRequiredForm(todo));
};

User.prototype.getToDo = function(toDoId) {
  return this.toDoList[toDoId];
};

User.prototype.editToDo = function (toDoId,editedToDoBody) {
  let editedToDo = this.convertToDoInRequiredForm(editedToDoBody);
  this.toDoList[toDoId] = editedToDo;
};

User.prototype.deleteToDo = function (toDoId) {
  this.toDoList = this.toDoList.reduce((todos,ele,index)=>{
    if (index != toDoId) {
      todos.push(ele);
    }
    return todos;
  },[]);
};

module.exports = User;
