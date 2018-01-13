const showItems = function(){
  let body = document.querySelector("body");
  let element;
  data.forEach((item,index)=>{
    if(item.status){
      element = document.createElement("strike");
    }else {
    element = document.createElement("li");
    }
    element.id = `item${index+1}`;
    element.innerText = item.item;
    body.appendChild(element)
  })
}

const editTitle = function(){
  let title = document.getElementById("title");
  let titleEditBox = document.createElement("textArea");
  titleEditBox.value = title.innerText;
  title.replaceChild(titleEditBox,title.childNodes[0]);
}

const editDescription = function(){
  let description = document.getElementById("description");
  let descEditBox = document.createElement("textArea");
  descEditBox.value = description.innerText;
  description.replaceChild(descEditBox,description.childNodes[0]);
}

const editItems = function(){
  let 

}

const getEditingOption = function(){
  editTitle();
  editDescription();
  editItems();
}
