const assert = require('chai').assert;
const ToDo = require("../models/todo.js");

describe("ToDo",()=>{
  beforeEach(()=>{
    toDo = new ToDo("at Work","important");
  })
  describe("addToItem",()=>{
    it("should add new item in to items of todo",()=>{
      toDo.addToItem("eat",0);
      let expectation = [{item:"eat",status:0}];
      assert.deepEqual(toDo.items,expectation);
    })
  })
  describe('paramsToItems',()=>{
    it("should create toDo in propriate format",()=>{
      let fnArgs = {1:"eat",2:"sleep",3:"repeat",
        status1:0,status2:0,status3:1};
      let fnOutput = toDo.paramsToItems(fnArgs);
      let expectation = [{item:"eat",status:0},{item:"sleep",status:0},
        {item:"repeat",status:1}];
        assert.deepEqual(fnOutput,expectation);
    })
  })

  describe("addMultipleItems",()=>{
    it("should add more than one new item in to items of todo",()=>{
      toDo.addMultipleItems({1:"eat",2:"sleep",3:"repeat",
        status1:0,status2:0,status3:1});
      let expectation = [{item:"eat",status:0},{item:"sleep",status:0},
        {item:"repeat",status:1}];
      assert.deepEqual(toDo.items,expectation);
    })
  })
})
