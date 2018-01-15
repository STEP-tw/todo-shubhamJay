let chai = require('chai');
let assert = chai.assert;
const User = require("../user.js");


describe("User ",()=>{
  describe("addSessionId",()=>{
    it("should adds sessionId to the user",()=>{
      let user = new User("john","john","john");
      user.addSessionId(123);
      assert.equal(user.sessionId,123);
    })
  })


  describe("createToDo",()=>{
    it("should create a todo in required data format",()=>{
      let user = new User("john","john","john");
      let fnOutput = user.createToDo({title:"atHome",description:"notDone",1:"go Home",2:"sleep"});
      let expectation = {title:"atHome",description:"notDone",items:[{item:"go Home",status:0},{item:"sleep",status:0}]}
      assert.hasAllKeys(fnOutput,["title","description","items"]);
      assert.deepOwnInclude(fnOutput,expectation);
    })
  })

  describe("addToDo",()=>{
    it("should create a todo in required data format and add it to the user",()=>{
      let user = new User("john","john","john");
      user.addToDo({title:"atHome",description:"notDone",1:"go Home",2:"sleep"});
      let expectation = {title:"atHome",description:"notDone",items:[{item:"go Home",status:0},{item:"sleep",status:0}]}
      assert.deepOwnInclude(user.toDoList,expectation);
    })
  })

  describe("getAllToDoTitles",()=>{
    it(" should give list all to do of the the user",()=>{
      let user = new User("john","john","john");
      user.addToDo({title:"atHome",description:"notDone",1:"go Home",2:"sleep"});
      assert.deepEqual(user.getAllToDoTitles(),["atHome"]);
    })
  })

  describe("getToDo",()=>{
    it("should find the to do by its title and give it",()=>{
      let user = new User("john","john","john");
      user.addToDo({title:"atHome",description:"notDone",1:"go Home",2:"sleep"});
      let fnOutput = user.getToDo("atHome");
      let expectation = {title:"atHome",description:"notDone",items:[{item:"go Home",status:0},{item:"sleep",status:0}]}
      assert.deepOwnInclude(fnOutput,expectation);
    })
  })

  describe("updateItemStatus",()=>{
    it("should update the item status which is complete or incomplete",()=>{
      let user = new User("john","john","john");
      let changesToUpdate = {title:"atHome",description:"notDone",1:"go Home",
        2:"sleep",status1:"complete",status2:'incomplete'};
        let previousItems = [{item:"go Home",status:0},{item:"sleep",status:0}]
        let fnOutput = user.updateItemStatus(previousItems,changesToUpdate);
      let expectation = [{item:"go Home",status:1},{item:"sleep",status:0}];
      assert.deepEqual(fnOutput,expectation);
    })
  })
})

// test for  edit to do and delete todo ;
