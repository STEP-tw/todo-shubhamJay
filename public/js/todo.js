const showItems = function(){
  let list = document.querySelector("ol");
  let element;
  console.log(data);
  data.forEach((item,index)=>{
    if(+item.status){
      element = document.createElement("strike");
    }else {
      element = document.createElement("li");
    }
    element.id = `item${index+1}`;
    element.name = index;
    element.innerText = item.item;
    list.appendChild(element);
  })
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

const getTextBox = function(name){
  let itemEditBox = document.createElement("textArea");
  itemEditBox.name = name;
  return itemEditBox;
}

const getSelectionOptions = function(name){
  let selectOption = document.createElement("select");
  selectOption.name = `status${name}`
  let doneOption = document.createElement('option')
  doneOption.innerText = "complete";
  let notdoneOption = document.createElement('option');
  notdoneOption.innerText = "incomplete";
  selectOption.appendChild(doneOption);
  selectOption.appendChild(notdoneOption);
  return selectOption;
}

const editItems = function(){
  let items = document.querySelectorAll("li");
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    let itemEditBox = getTextBox(i+1);
    itemEditBox.innerText = item.innerText;
    let selectOption = getSelectionOptions(i+1);
    item.replaceChild(itemEditBox,item.childNodes[0]);
    item.appendChild(selectOption);
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

const getEditingOption = function(){
  editTitle();
  editDescription();
  editItems();
  hideEditOption();
  showSubmitButton();
}
