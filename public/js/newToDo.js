let counter = 0;

const getTextBox = function(){
  let form = document.querySelector("form");
  let textBox = document.createElement("textArea");
  textBox.name = `${++counter}`;
  textBox.required = true;
  form.appendChild(textBox)
  form.innerHTML += '<br/><br/>'
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
