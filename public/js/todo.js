const createListItem = function(ID){
  let element = document.createElement("li");
  element.id = `item${ID+1}`;
  element.name = ID;
  return element;
}

const showToDo = function(){
  let list = document.querySelector("ol");
  data.forEach((item,index)=>{
    let element = createListItem(index);
    element.innerText = item.item;
    if(+item.status){
      let strike = document.createElement("strike");
      strike.appendChild(element);
      element = strike;
    }
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

const createOption = function(name,value){
  let option = document.createElement("option");
  option.value = value;
  option.innerText = name;
  return option;
}

const createTextBox = function(name){
  let itemEditBox = document.createElement("textArea");
  itemEditBox.name = name;
  return itemEditBox;
}

const getSelectionOptions = function(ID,status){
  let selectOption = document.createElement("select");
  selectOption.name = `status${ID}`
  let doneOption = createOption("complete",1);
  let notdoneOption = createOption("incomplete",0);
  if (status) {
    selectOption.appendChild(doneOption);
    selectOption.appendChild(notdoneOption);
  } else {
    selectOption.appendChild(notdoneOption);
    selectOption.appendChild(doneOption);
  }
  return selectOption;
}


const getEditingOptionForItem = function(item,index){
  let strikeItems = document.querySelectorAll("strike");
  let status = false;
  strikeItems.forEach((strikeItem)=>{
    if (strikeItem.contains(item)) status = true;
  });
  let itemEditBox = createTextBox(index+1);
  let selectOption = getSelectionOptions(index+1,status);
  itemEditBox.innerText = item.innerText;
  item.replaceChild(itemEditBox,item.childNodes[0]);
  item.appendChild(selectOption);
}

const editItems = function(){
  let items = document.querySelectorAll("li");
  items.forEach(getEditingOptionForItem);
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

const deleteToDo = function(toDoID){
  let req =new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    console.log(this.responseText);
    window.location = this.responseText;
  };
  req.open("DELETE",`/toDo/${toDoID}`);
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
  showToDo()
}
