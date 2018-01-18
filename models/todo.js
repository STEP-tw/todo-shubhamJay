class ToDo {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.items = [];
  }

  addToItem(item,status){
    let itemToAdd = {item:item,status:status||0};
    this.items.push(itemToAdd);
  }
  paramsToItems(rawBody){
    return Object.keys(rawBody).reduce((td, k,index) => {
      if (k / 1)
        td.push({item: rawBody[k],status: rawBody[`status${index+1}`]||0 });
      return td;
    },[]);
  }
  addMultipleItems(rawBody){
    let items = this.paramsToItems(rawBody);
    this.items = this.items.concat(items);
  }
}

module.exports = ToDo;
