const form = document.querySelector('#form');
const newTask = document.querySelector('#new');
const btn =  document.querySelector('#add');
const tasks = document.querySelector('#tasks');
console.log(newTask, add, tasks, form);


let todoList = [];

btn.addEventListener('click', function(){
    let newTodo = {
        todo: newTask.value,
        checked: false,
        important: false,
    }
    todoList.push(newTodo)
    messages();
})

function messages() {
    let displayMessage ='';

    todoList.forEach(function(item,index) {
         displayMessage += `
                <div class="todo__task">
                    <label  class="todo__checkbox">
                        <input type="checkbox">
                        <div></div>
                    </label>
                    <ul id="tasks" class="todo__task-text"><li>${newTask.value}</li></ul>
                    <div class="todo__task-del">✗</div>
                </div>
        `;
        tasks.innerHTML = displayMessage;
    })
}