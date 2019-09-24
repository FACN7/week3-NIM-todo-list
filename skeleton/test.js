var test = require('tape');
// var logic  = require('./logic');
const todoFunctions = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

test('Testing addTodo', function(t) {
  var item1=todoFunctions.generateId();
  var item2=todoFunctions.generateId();
  var item3=todoFunctions.generateId();
  var list = [
    { id: item1, description: 'first todo' },
    { id: item2, description: 'second todo' },
    { id: item3, description: 'third todo' }
  ];
    var actual = todoFunctions.addTodo(list, 'fourth todo');
  var expected = [
    { id: 1, description: 'first todo' },
    { id: 2, description: 'second todo' },
    { id: 3, description: 'third todo' },
    { id: 4, description: 'fourth todo' }
  ];
  t.deepEqual(actual, expected, 'Should return a list with added item');
  t.deepEqual(list, [
    { id: 1, description: 'first todo' },
    { id: 2, description: 'second todo' },
    { id: 3, description: 'third todo' },
  ],"constant array has not been altered");
  t.end();
});
