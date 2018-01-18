let chai = require('chai');
let assert = chai.assert;
const User = require("../models/user.js");

describe("User ", () => {
  beforeEach(() => {
    user = new User("john", "john", "john");
  })
  describe("addSessionId", () => {
    it("should adds sessionId to the user", () => {
      user.addSessionId(123);
      assert.equal(user.sessionId, 123);
    })
  })

  describe("convertToDoInRequiredForm", () => {
    it("should create a todo in required data format", () => {

      let fnOutput = user.convertToDoInRequiredForm({
        title: "atHome",
        description: "notDone",
        1: "go Home",
        2: "sleep"
      });
      let expectation = {
        title: "atHome",
        description: "notDone",
        items: [{
          item: "go Home",
          status: 0
        }, {
          item: "sleep",
          status: 0
        }]
      }
      assert.hasAllKeys(fnOutput, ["title", "description", "items"]);
      assert.propertyVal(fnOutput, 'title', "atHome");
      assert.propertyVal(fnOutput, 'description', "notDone");
      assert.includeDeepMembers(fnOutput.items, expectation.items);
    })
  })

  describe("addToDo", () => {
    it("should create a todo in required data format and add it to the user", () => {
      user.addToDo({
        title: "atHome",
        description: "notDone",
        1: "go Home",
        2: "sleep"
      });
      let expectation = [{
        title: "atHome",
        description: "notDone",
        items: [{
          item: "go Home",
          status: 0
        }, {
          item: "sleep",
          status: 0
        }]
      }];
      let userToDo = user.toDoList;
      assert.propertyVal(userToDo[0], 'title', "atHome");
      assert.propertyVal(userToDo[0], 'description', "notDone");
      assert.includeDeepMembers(userToDo, expectation);
    })
  })

  describe("getAllToDoTitles", () => {
    it(" should give list of all todo of the the user", () => {
      user.addToDo({
        title: "atHome",
        description: "notDone",
        1: "go Home",
        2: "sleep"
      });
      assert.deepEqual(user.getAllToDoTitles(), ["atHome"]);
    })
  })

  describe("getToDo", () => {
    it("should find the todo by its id and give it", () => {
      user.addToDo({
        title: "atHome",
        description: "notDone",
        1: "go Home",
        2: "sleep"
      });
      let fnOutput = user.getToDo(0);
      let expectation = {
        title: "atHome",
        description: "notDone",
        items: [{
          item: "go Home",
          status: 0
        }, {
          item: "sleep",
          status: 0
        }]
      }
      assert.deepOwnInclude(fnOutput, expectation);
    })
  })
  describe("editToDo", () => {
    it("should replace the previous todo of that id with new edited todo", () => {
      user.addToDo({
        title: "atHome",
        description: "notDone",
        1: "go Home",
        2: "sleep"
      });
      user.addToDo({
        title: "atWork",
        description: "do your work",
        1: "work",
        2: "work",
        3: "work"
      });
      let editedToDo = {
        title: "whole day",
        description: 'do it',
        1: 'wake up',
        status1: 0,
        2: "sleep",
        status2: 1
      };
      let fnOutput = user.editToDo(1, editedToDo);
      let expectation = [{
          title: "atHome",
          description: "notDone",
          items: [{
            item: "go Home",
            status: 0
          }, {
            item: "sleep",
            status: 0
          }]
        },
        {
          title: "whole day",
          description: 'do it',
          items: [{
            item: 'wake up',
            status: 0
          }, {
            item: "sleep",
            status: 1
          }]
        }
      ];
      assert.includeDeepMembers(user.toDoList, expectation);
    })
  })

  describe("editToDo", () => {
    it("should delete the todo to that specific id",()=>{
      user.addToDo({title:"atWork",description:"important",1:"do work",
        2:'do more Work',status1:1,status2:0});
      user.deleteToDo(0);
      assert.deepEqual(user.toDoList,[]);
    })
  })
})


// test for delete todo ;
