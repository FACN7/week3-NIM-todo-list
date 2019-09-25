// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var RemoveStartingState=true;
  var state = [
    { id: -3, description: 'first todo sample...' },
    { id: -2, description: 'second todo sample...' },
    { id: -1, description: 'third todo sample...' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var descriptionSpan = document.createElement('span');
    descriptionSpan.textContent=todo.description;
    descriptionSpan.className = "task-item";
    // descriptionSpan.className="test";
    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent = "Delete";
    deleteButtonNode.className = "delete-button";
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    // add markTodo button
    var markTodoNode = document.createElement('INPUT');
    markTodoNode.className = "checker";
    markTodoNode.setAttribute("type","checkbox");
    markTodoNode.id=todo.id;
    if(todo.hasOwnProperty('done')){
      markTodoNode.checked=true;
      descriptionSpan.className="task-item done";
    } else{
      markTodoNode.checked=false;
      descriptionSpan.className="task-item in-progress";
    }
    //add Edit Button
    var editButtonNode = document.createElement('button');
      editButtonNode.innerHTML="x";
      // editButtonNode.className="fas fa-pen";
    editButtonNode.addEventListener('click', function(event) {
      if(editButtonNode.innerHTML==="x"){
        editButtonNode.innerHTML="v"
        descriptionSpan.contentEditable=true;
      }else{
        editButtonNode.innerHTML="x"
        descriptionSpan.contentEditable=false;

      }
    });

    descriptionSpan.addEventListener('keypress',function(e){
      if (event.keyCode == 13) {
        event.preventDefault();
        editButtonNode.click();
      }
    });

    // markTodoNode.checked=false;
    markTodoNode.addEventListener('change', function(event) {
      // event.preventDefault();
       console.log(event.target.checked)

    var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(descriptionSpan);
    todoNode.appendChild(markTodoNode);
    todoNode.appendChild(deleteButtonNode);
    todoNode.appendChild(editButtonNode);


    // add classes for css

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      event.preventDefault();
      // what is inside event.target?

      var description = document.getElementById('task_description').value; // event.target ....
      // hint: todoFunctions.addTodo
      document.getElementById('task_description').value = "";
      var newState = todoFunctions.addTodo(state,description); // ?? change this!
      if(RemoveStartingState){
        RemoveStartingState=false;
        newState= todoFunctions.addTodo([],description);
      }
      update(newState);
    });
  }

  // you should not need to change this function
  var update = function(newState) {

    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
