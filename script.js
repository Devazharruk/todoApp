const taskInputField = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task");
const taskDataContainer = document.querySelector("#task-data");
const seachInputField = document.querySelector("#search");
const errorBox = document.querySelector(".error-box p");
const btnText = addTaskBtn.textContent;

let tasksArray = [];
let edit_id = null;

const objStr = localStorage.getItem("tasks");
if (objStr != null) {
    tasksArray = JSON.parse(objStr);
}

addTaskBtn.addEventListener("click", () => {
    const inputValue = taskInputField.value;
    if (edit_id != null) {
        // edit task
        tasksArray.splice(edit_id, 1, { "task": inputValue });
        edit_id = null;
    } else {
        tasksArray.push({ "task": inputValue });
    }
    taskInputField.value = "";
    addTaskBtn.textContent = btnText;
    saveTask(tasksArray);
});

// function to save the tasks in localStorage
const saveTask = (array) => {
    const str = JSON.stringify(array);
    localStorage.setItem("tasks", str);
    displayTask();
}

// function to display the Tasks
const displayTask = () => {
    let taskElem = "";
    tasksArray.forEach((data, index) => {
        taskElem += `<tr>
                            <td>${index + 1}</td>
                            <td>${data.task}</td>
                            <td>
                                <button class="edit" onclick = "editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="delete" onclick = "deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`
    });
    taskDataContainer.innerHTML = taskElem;
}

// function to edit the Tasks
const editTask = (id) => {
    edit_id = id;
    taskInputField.value = tasksArray[id].task;
    addTaskBtn.textContent = "Save Changes";
}

// function to delete the Tasks
const deleteTask = (id) => {
    tasksArray.splice(id, 1);
    saveTask(tasksArray);
}
displayTask(); 

// logic for search functionality
const allTrs = document.querySelectorAll("#task-data tr");
seachInputField.addEventListener("input", (e) => {
    const userSearch = e.target.value.toLowerCase();
    taskDataContainer.innerHTML = "";
    allTrs.forEach(tr => {
        const td_in_trs = tr.querySelectorAll("td");
        if (td_in_trs[1].textContent.toLowerCase().indexOf(userSearch) > -1) {
            taskDataContainer.appendChild(tr);
        }
    });
    if (taskDataContainer.innerHTML == "") {
        taskDataContainer.textContent = "No task found!";
    }
});

