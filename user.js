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

User.prototype.updateItemStatus = function (todo,updatedBody) {
  return todo.reduce((updatedToDos,item,index)=>{
    if(updatedBody[`status${index+1}`] == "complete"){
      item.status = 1;
    }
    updatedToDos.push(item);
    return updatedToDos;
  },[])
};

User.prototype.editToDo = function (previousTitle,editedToDoBody) {
  let editedToDo = this.createToDo(editedToDoBody);
  editedToDo.items = this.updateItemStatus(editedToDo.items,editedToDoBody)
  this.toDoList = this.toDoList.reduce((todos,ele)=>{
    if (ele.title == previousTitle) {
      todos.push(editedToDo);
    } else{
      todos.push(ele);
    }
    return todos;
  },[])
};

User.prototype.deleteToDo = function (toDoToDelete) {
  this.toDoList = this.toDoList.reduce((todos,ele)=>{
    if (ele.title != toDoToDelete) {
      todos.push(ele);
    }
    return todos;
  },[]);
};

module.exports = User;
