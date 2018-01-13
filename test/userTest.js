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
  
})
