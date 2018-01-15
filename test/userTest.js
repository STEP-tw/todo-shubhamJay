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
  describe("getAllToDoTitles",()=>{
    it(" should give list all to do of the the user",()=>{
      let user = new User("john","john","john");
      assert.equal(user.getAllToDoTitles(),"atwork");
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
})
