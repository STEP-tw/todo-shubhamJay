let counter = 0;

const getTextBox = function(){
  let form = document.querySelector("form");
  let textBox = document.createElement("textArea");
  textBox.name = `${++counter}`;
  form.appendChild(textBox)
  form.innerHTML += '<br/><br/>'
}
