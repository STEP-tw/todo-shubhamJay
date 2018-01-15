const showItems = function(){
  let list = document.querySelector("ol");
  let element;
  data.forEach((item,index)=>{
    if(+item.status){
      element = document.createElement("strike");
    } else {
      element = document.createElement("li");
    }
    element.id = `item${index+1}`;
    element.name = index;
    element.innerText = item.item;
    list.appendChild(element);
  });
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

const createOption = function(name){
  let option = document.createElement("option");
  option.innerText = name;
  return option;
}

const createTextBox = function(name){
  let itemEditBox = document.createElement("textArea");
  itemEditBox.name = name;
  return itemEditBox;
}

const getSelectionOptions = function(name){
  let selectOption = document.createElement("select");
  selectOption.name = `status${name}`
  let doneOption = createOption("complete");
  let notdoneOption = createOption("incomplete");
  selectOption.appendChild(notdoneOption);
  selectOption.appendChild(doneOption);
  return selectOption;
}

const getEditingOptionForItem = function(item,index){
  let itemEditBox = createTextBox(index+1);
  let selectOption = getSelectionOptions(index+1);
  itemEditBox.innerText = item.innerText;
  item.replaceChild(itemEditBox,item.childNodes[0]);
  item.appendChild(selectOption);
}

const editItems = function(){
  let completedItems = document.querySelectorAll("strike");
  let incompletedItems = document.querySelectorAll("li");
  incompletedItems.forEach(getEditingOptionForItem);
  completedItems.forEach(getEditingOptionForItem);
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
