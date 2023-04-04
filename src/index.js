import './style.css';

import UI from './modules/UI.js';
import ToDoList from './modules/ToDoList.js';


// EventListening to add with List.
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const inputList = document.getElementById('myInput');
  inputList.addEventListener('keypress', (event) => {
    const list = inputList.value;
    if (list === null || '') {
      return null;
    }

    if (event.key === 'Enter') {
      const newToDo = new ToDoList(list);

      ui.displayToDo(newToDo);
      newToDo.addList(newToDo);
      ui.clearFieldInput();
      ui.registerEventListeners();
      
    }
    return null;
  });

   // EventListening to remove list when clicking the trash icon.
   document.getElementById('items').addEventListener('click', (e) => {
    if (e.target.id === 'delete-task') {
      const todoList = new ToDoList();
      todoList.remove(e.target);

    }
  });
});

// Refresh the page with localStorage List
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const List = new ToDoList();
    List.todoList.forEach((item) => {
    const newToDo = new ToDoList(item.desc, item.completed, item.index);
    ui.displayToDo(newToDo);
  });
});

// clear all Btn

document.getElementById('btn-clearAll').addEventListener('click', () => {
  const todoListContainer = document.getElementById('items');
  const toDoList = new ToDoList();
  
  todoListContainer.childNodes.forEach((child) => {
    if (child.nodeName === 'LI') {
      const hr = child.nextElementSibling;

      const inputEl2 = child.querySelector('.todo-list-item');

      const isCompleted = inputEl2.classList.contains('completed');

      if (isCompleted === true) {
        const itemIndex = parseInt(child.querySelector('.delete').getAttribute('data-index'), 10);
        const itemToRemoveIndex = toDoList.todoList.findIndex((item) => item.index === itemIndex);
        toDoList.todoList.splice(itemToRemoveIndex, 1);
        localStorage.setItem('todoList', JSON.stringify(toDoList.todoList));
        child.remove();
        hr.remove();
      }
    }
  });

  const reorderedList = toDoList.reorderTodoList(toDoList.todoList);
  localStorage.setItem('todoList', JSON.stringify(reorderedList));
  window.location.reload();
});