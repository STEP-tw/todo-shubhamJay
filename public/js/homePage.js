const showToDo = function(todos){
  todos.forEach((i)=>{
    let body = document.querySelector('body');
    let element = document.createElement('li');
    element.innerHTML = `<a href=/${i}>${i}</a>`;
    body.appendChild(element);
  });
};

const loadToDo = function(){
  let req =new XMLHttpRequest();
  req.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(JSON.parse(this.responseText));
    showToDo(JSON.parse(this.responseText));
  }
};
  req.open("GET","/getAllToDo");
  req.send();
}
