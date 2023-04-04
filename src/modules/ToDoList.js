class ToDoList {
    constructor(desc, completed = false, index) {
      this.todoList = JSON.parse(localStorage.getItem('todoList')) || []
      this.desc = desc;
      this.completed = completed;
      if (index !== undefined) {
        this.index = index;
      } else {
        this.todoList;
        const lastIndex = JSON.parse(localStorage.getItem('lastIndex')) || 0;
        this.index = this.todoList.length > 0 ? this.todoList[todoList.length - 1].index + 1 : lastIndex + 1;
        localStorage.setItem('lastIndex', JSON.stringify(this.index));
      }
      
    }
  
    // Reorder List
  
   reorderTodoList = (todoList) => {
      const reorderedList = todoList.map((item, index) => {
        item.index = index + 1;
        return item;
      });
      return reorderedList;
    }
  
    // function to addList
    addList =(todoItem) => {
      let todoList = this.todoList;
      todoList.push(todoItem);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  
   
  
    // function to remove
    remove = (target) => {
      const li = target.parentElement.parentElement;
      const hr = li.nextElementSibling;
      const itemIndex = parseInt(li.querySelector('.delete').getAttribute('data-index'), 10);
      
      const itemToRemoveIndex = this.todoList.findIndex((item) => item.index === itemIndex);
      this.todoList.splice(itemToRemoveIndex, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      hr.remove();
      li.remove();
  
      // Reorder indexes
      const reorderedList = this.reorderTodoList(this.todoList);
      localStorage.setItem('todoList', JSON.stringify(reorderedList));
  
    };
  }

  export default ToDoList