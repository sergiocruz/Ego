var expect = require('expect.js');
var Ego = require("../../build/Ego");

describe("StateMachine", function(){

  it("should initialize", function(){

    var knowledge = new Ego.Knowledge();

    var stateMachine = new Ego.StateMachine("stateMachine1", knowledge);

    expect(stateMachine instanceof Ego.State).to.eql(true);
    expect(stateMachine._knowledge).to.eql(knowledge);
    expect(stateMachine._statesByID).to.eql({});
    expect(stateMachine._transitionsByStateID).to.eql({});
    expect(stateMachine._name).to.eql("stateMachine1");
    expect(stateMachine._id).to.have.length(36);
    expect(stateMachine._parent).to.eql(null);
  });

  it("should add state", function(){

    var knowledge = new Ego.Knowledge();

    var stateMachine1 = new Ego.StateMachine("stateMachine1", knowledge);
    var stateMachine2 = new Ego.StateMachine("stateMachine1", knowledge);

    var state1 = new Ego.State("idle");
    var state2 = new Ego.State("idle");

    var id1 = state1.getID();
    var id2 = state2.getID();

    var obj = {};
    var obj2 = {};
    obj[id1] = state1;
    obj2[id1] = [];

    expect(stateMachine1.addState(state1)).to.eql(true);
    expect(stateMachine1._statesByID).to.eql(obj);
    expect(stateMachine1._transitionsByStateID).to.eql(obj2);

    obj[id2] = state2;
    obj2[id2] = [];

    expect(stateMachine1.addState(state2)).to.eql(true);
    expect(stateMachine1._statesByID).to.eql(obj);
    expect(stateMachine1._transitionsByStateID).to.eql(obj2);

    expect(stateMachine1.addState(state1)).to.eql(false);
    expect(stateMachine1.addState(state2)).to.eql(false);
    expect(stateMachine1._statesByID).to.eql(obj);
    expect(stateMachine1._transitionsByStateID).to.eql(obj2);

    expect(stateMachine2.addState(state1)).to.eql(false);
    expect(stateMachine2.addState(state2)).to.eql(false);
    expect(stateMachine2._statesByID).to.eql({});
    expect(stateMachine2._transitionsByStateID).to.eql({});
  });

  it("should remove state", function(){

    var knowledge = new Ego.Knowledge();
    var stateMachine = new Ego.StateMachine("stateMachine1", knowledge);

    var state = new Ego.State("idle");

    expect(stateMachine.removeState(state)).to.eql(false);

    stateMachine.addState(state);

    expect(stateMachine.removeState(state)).to.eql(true);
    expect(stateMachine._statesByID).to.eql({});
    expect(stateMachine._transitionsByStateID).to.eql({});
  });
});
