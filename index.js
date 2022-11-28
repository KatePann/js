const form = document.querySelector('#form');
const newTask = document.querySelector('#new');
const btn =  document.querySelector('#add');
const tasks = document.querySelector('#tasks');



let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    messages();
}

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

//добавление задачи

function messages() {
    let addTask ='';

    todoList.forEach(function(item,index) {
        const cls = item.checked ? 'todo__task todo__task_complete' : 'todo__task';
        const checked = item.checked ? 'checked' : '';

        addTask += `
            <div id='${item.id}' class="${cls}">
                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="todo__checkbox-div"></div>
                </label>
                <div class="todo__task-text">${item.todo}</div>
                <div class="todo__task-del">✗</div>
            </div>
        `;
        tasks.innerHTML = addTask;
    })
}
//изменение статуса задачи

tasks.addEventListener('click', function (event) {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo__task-del')

    if (isCheckboxEl) {
      const task = target.parentElement.parentElement
      const taskId = task.getAttribute('id')
      changeTaskStatus(taskId, todoList);
      messages()
    }
    
    if(isDeleteEl){
      const task = target.parentElement
      const taskId = task.getAttribute('id')
      deleteTask(taskId, todoList)
      messages()
    }
})

function changeTaskStatus(id, list) {
    list.forEach((item)=>{
        if(item.id == id){
            item.checked = !item.checked
        }
    })
}

//удаление задачи
function deleteTask(id, list) {
    list.forEach((item, index)=>{
        if(item.id == id){
            list.splice(index,1)
        }
    })
}

//редактирование задачи
tasks.addEventListener('dblclick', (e) => {
    if (e.target.textContent) {
        const newText = prompt();
      e.target.textContent = newText;
    }
  });

  //фильтры