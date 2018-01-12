const User = function(name,userId,password){
  this.name = name;
  this.userId = userId;
  this.password = password;
  this.toDoList = [{title:'1st'},{title:'2nd'},{title:'3rd'}];
}

User.prototype.addSessionId = function (sessionId ) {
  this.sessionId = sessionId;
};

User.prototype.getAllToDo = function(){
  let allToDoTiTles = this.toDoList.map((t)=>t.title);
  return allToDoTiTles;
}

User.prototype.addToDo = function (todo) {
  this.toDoList.push(todo);
};

module.exports = User;
