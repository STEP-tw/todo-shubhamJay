const User = function(name, userId, password) {
  this.name = name;
  this.userId = userId;
  this.password = password;
  this.toDoList = [{title:"atwork",description:"imp",
    items:[{item:"eat",status:0},{item:"sleep",status:0},{item:"repeat",status:0}]}];
}

User.prototype.addSessionId = function(sessionId) {
  this.sessionId = sessionId;
};

User.prototype.getAllToDoTitles = function() {
  let allToDoTiTles = this.toDoList.map((t) => t.title);
  return allToDoTiTles;
}

User.prototype.addToDo = function(todo) {
  let title = todo.title;
  let description = todo.description;
  let items = Object.keys(todo).reduce((td, k) => {
    if (k / 1)
      td.push({item: todo[k],status: 0 });
    return td;
  },[]);
  this.toDoList.push({title:title,description:description,items:items});
};

User.prototype.getToDo = function(title) {
  return this.toDoList.find((t) => t.title == title);
};

module.exports = User;
