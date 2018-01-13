const showToDo = function(todos){
  todos.forEach((i)=>{
    let body = document.querySelector('body');
    let element = document.createElement('li');
    element.innerHTML = `<a href=/${i.replace(/" "/g,"00")}>${i}</a>`;
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
