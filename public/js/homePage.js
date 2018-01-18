const showToDo = function(todos){
  todos.forEach((i,index)=>{
    let body = document.querySelector('body');
    let element = document.createElement('li');
    element.innerHTML = `<a href=/toDo/${index}>${i}</a>`;
    body.appendChild(element);
  });
};

const loadToDo = function(){
  let req =new XMLHttpRequest();
  req.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    showToDo(JSON.parse(this.responseText));
  }
};
  req.open("GET","/getAllToDo");
  req.send();
}

const displayActiveUser = function(nameOfUser){
  let userNameBox = document.getElementById('activeUser');
  userNameBox.innerText += nameOfUser;
}

const getNameOfUser = function () {
  let req =new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (this.readyState == 4) {
        displayActiveUser(this.responseText);
    }
  }
  req.open("GET","/userName");
  req.send();
}

const actionOnLoad = function(){
  getNameOfUser();
  loadToDo();
}
