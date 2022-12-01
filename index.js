const newTask = document.querySelector('#new');
const btn =  document.querySelector('#add');
const tasks = document.querySelector('#tasks');
const pendingNum = document.querySelector('.pending__num')
const clearButton = document.querySelector('.clear__button')
const filterOption = document.querySelector('.filter__todo')




let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    messages();
}
if (localStorage.getItem('change')) {
    todoList = JSON.parse(localStorage.getItem('change'))
    messages();
}

//добавление задачи

btn.addEventListener('click', function(){
    let newTodo = {
        id: Date.now(),
        todo: newTask.value,
        checked: false,
    }
    todoList.push(newTodo);
    newTask.value='';
    messages();
    localStorage.setItem('todo', JSON.stringify(todoList));
})

function messages() {
    let addTask ='';

    todoList.forEach(function(item,index) {
        const cls = item.checked ? 'todo__task todo__task_complete' : 'todo__task';
        const checked = item.checked ? 'checked' : '';

        addTask += `
            <div id='${item.id}' class="${cls} pending">
                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="todo__checkbox-div"></div>
                </label>
                <div class="todo__task-text">${item.todo}</div>
                <div data-action="delete" class="todo__task-del">✗</div>
            </div>
        `;
        tasks.innerHTML = addTask;
        allTasks()
    })
}

//изменение статуса задачи и удаление

// tasks.addEventListener('click', function (event) {
//     const target = event.target
//     const isCheckboxEl = target.classList.contains('todo__checkbox-div')
//     const isDeleteEl = target.classList.contains('todo__task-del')

//     if (isCheckboxEl) {
//       const task = target.parentElement.parentElement
//       const taskId = task.getAttribute('id')
//       changeTaskStatus(taskId, todoList);
//       messages()
//     }
    
//     if(isDeleteEl){
//       const task = target.parentElement
//       const taskId = task.getAttribute('id')
//       deleteTask(taskId, todoList)
//     }
//       messages()
//       localStorage.setItem('change', JSON.stringify(todoList));
// })

// function changeTaskStatus(id, list) {
//     list.forEach((item)=>{
//         if(item.id == id){
//             item.checked = !item.checked
//         }
//     })
// }

// function deleteTask(id, list) {
//     list.forEach((item, index)=>{
//         if(item.id == id){
//             list.splice(index,1)
//         }
//     })
// }

tasks.addEventListener('click', function (event){
if (event.target.dataset.action==='delete') {
    const parentNode = event.target.closest('.pending')
    parentNode.remove()
}
})




//редактирование задачи
tasks.addEventListener('dblclick', (e) => {
    console.log(e);
    // e.target.textContent

    
  });

  //инфо
  function allTasks() {
    let tasks = document.querySelectorAll('.pending')
    pendingNum.textContent = tasks.length === 0 ? 'no' : tasks.length
  }

  clearButton.addEventListener('click', ()=>{
    tasks.remove()
    allTasks()
  })


  filterOption.addEventListener('click', filterTodo)
  
  function filterTodo(e) {
      const todos= tasks.childNodes
      console.log(todos);
    todos.forEach(function (todo) {
        console.log(todo);
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex' 
                break;
            case "active":
                if (todo.classList.contains('active')) {
                   todo.style.display= 'flex' 
                }else{
                    todo.style.display= 'none'
                }
                break;
            case "completed":
                    if (!todo.classList.contains('active')) {
                       todo.style.display= 'flex' 
                    }else{
                        todo.style.display= 'none'
                    }
                break;
        }
    })
  }