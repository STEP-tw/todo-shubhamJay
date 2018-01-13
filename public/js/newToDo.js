let counter = 0;

const getTextBox = function(){
  let body = document.querySelector("body");
  let textBox = document.createElement("textArea");
  textBox.name = `${++counter}`;
  body.appendChild(textBox)
  body.innerHTML += '<br/><br/>'
}
