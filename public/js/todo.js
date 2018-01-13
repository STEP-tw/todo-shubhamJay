const showItems = function(){
  let form = document.querySelector("form");
  let element;
  data.forEach((item,index)=>{
    if(item.status){
      element = document.createElement("strike");
    }else {
    element = document.createElement("li");
    }
    element.id = `item${index+1}`;
    element.innerText = item.item;
    form.appendChild(element)
  })
  generateDeleteUrl();
}

const generateDeleteUrl = function(){
  let deleteOption = document.getElementById('deleteOption');
  
}

const editTitle = function(){
  let title = document.getElementById("title");
  let titleEditBox = document.createElement("textArea");
  titleEditBox.name = "title";
  titleEditBox.value = title.innerText;
  title.replaceChild(titleEditBox,title.childNodes[0]);
}

const editDescription = function(){
  let description = document.getElementById("description");
  let descEditBox = document.createElement("textArea");
  descEditBox.name = "description";
  descEditBox.value = description.innerText;
  description.replaceChild(descEditBox,description.childNodes[0]);
}

const getOption = function(value){
  let option = document.createElement("option");
  option.value = value;
  option.innerText = value;
  return option;
}

const editItems = function(){
  let items = document.querySelector('form').querySelectorAll("li");
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    let itemEditBox = document.createElement("textArea");
    itemEditBox.name = `${i+1}`;
    itemEditBox.innerText = item.innerText;
    item.replaceChild(itemEditBox,item.childNodes[0]);
  };
}

const hideEditOption = function(){
  let editButton = document.getElementById('editButton');
  editButton.className = "hide";
  editButton.innerText ="";
}

const showSubmitButton = function(){
  let submitButton = document.getElementById('submitButton');
  submitButton.className = "options";
}

const createFormUrl = function(){
  let title = document.getElementById("title");
  let form = document.querySelector('form');
  form.action += title.innerText;
}

const getEditingOption = function(){
  createFormUrl();
  editTitle();
  editDescription();
  editItems();
  hideEditOption();
  showSubmitButton();
}
