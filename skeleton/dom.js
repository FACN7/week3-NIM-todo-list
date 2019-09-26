// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var RemoveStartingState=true;
  var state = [
    { id: -1, description: 'Finding a completely legit version of a brand.' },
    { id: -2, description: 'pre-prepared food, why buy regular old prepared food?' },
    { id: -3, description: 'Any list that contains ammo, beer and Sudafed is a party I’m not going to.' },
    { id: -4, description: 'Nice. Self-directed sarcasm, bad dogs. Keeping it real. And very alone.' },

  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var descriptionSpan = document.createElement('label');
    descriptionSpan.textContent=todo.description;
    descriptionSpan.className = "task-item";
    descriptionSpan.for = todo.id;
    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent = "Delete";
    deleteButtonNode.className = "delete-button";


    deleteButtonNode.addEventListener('click', function(event) {
      str=todo.description;
      var newState = todoFunctions.deleteTodo(state, todo.id);
     var alertbox = document.querySelectorAll(".alert");
       alertbox [0].style.opacity=1;
       alertbox [0].innerText= str+' has deleted';
      setTimeout(function(){
         alertbox [0].style.opacity=0;
            }, 2000);


      update(newState);

    });
    // add markTodo button
    var markTodoNode = document.createElement('INPUT');
    markTodoNode.className = "checker";
    markTodoNode.setAttribute("type","checkbox");
    markTodoNode.id=todo.id;
    if(todo.done === true){
      markTodoNode.checked=true;
      descriptionSpan.className="task-item done";
    } else{
      markTodoNode.checked=false;
      descriptionSpan.className="task-item";
    }
    //add Edit Button
    var editButtonNode = document.createElement('button');
      editButtonNode.innerHTML=" EDIT";
      editButtonNode.className="fas fa-pen edit-button";
      // editButtonNode.className = "edit-button";

    editButtonNode.addEventListener('click', function(event) {
      if(editButtonNode.innerHTML===" EDIT"){
        editButtonNode.innerHTML=" DONE"
        descriptionSpan.contentEditable=true;
        descriptionSpan.className = "task-item editing";
        descriptionSpan.focus();
      }else{
        editButtonNode.innerHTML=" EDIT"
        descriptionSpan.contentEditable=false;
        descriptionSpan.className = "task-item";
        todo.description=descriptionSpan.textContent;
        descriptionSpan.blur();

      }
    });

    descriptionSpan.addEventListener('keypress',function(e){
      if (event.keyCode == 13) {
        event.preventDefault();
        editButtonNode.click();
      }
    });

    // This function should mark a task as done by clicking on this task

    descriptionSpan.addEventListener('click', function(event) {
      if(!descriptionSpan.classList.contains("editing")){
        event.preventDefault();
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      }
    });

    // This function should mark a task as done by clicking on checkbox

    markTodoNode.addEventListener('change', function(event) {
      event.preventDefault();
    var newState = todoFunctions.markTodo(state, todo.id);
    console.log(newState);
    // state=newState
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
      if(description!==""){
      document.getElementById('task_description').value = "";
      var newState = todoFunctions.addTodo(state,description); // ?? change this!
      // if(RemoveStartingState){
      //   RemoveStartingState=false;
      //   newState= todoFunctions.addTodo([],description);
      // }



       update(newState);



    }
    });

  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    state.sort(function(a, b) {
      return (b.id -a.id);
  })


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


  // sortTodos(todos);
console.log(state);
  state.sort(function(a, b) {
    return (a.id -b.id);
})
console.log(state);

})();
