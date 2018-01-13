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

User.prototype.createToDo = function (body) {
  let title = body.title;
  let description = body.description;
  let items = Object.keys(body).reduce((td, k) => {
    if (k / 1)
      td.push({item: body[k],status: 0 });
    return td;
  },[]);
  return {title:title,description:description,items:items}
};

User.prototype.addToDo = function(todo) {
  this.toDoList.push(this.createToDo(todo));
};

User.prototype.getToDo = function(title) {
  return this.toDoList.find((t) => t.title == title);
};

User.prototype.editToDo = function (previousTitle,editedToDoBody) {
  let editedToDo = this.createToDo(editedToDoBody);
  this.toDoList = this.toDoList.reduce((todos,e)=>{
    if (e.title == previousTitle) {
      todos.push(editedToDo);
    } else{
      todos.push(e);
    }
    return todos;
  },[])
};
module.exports = User;
