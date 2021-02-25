import {allProjects} from "./../index.js";
import {activeProject} from "./logic.js";
import moment from 'moment';
import {createToDoBtnListeners, createProjectBtnListeners} from "./buttonListeners.js";

const projectContainer = document.querySelector(".project-container");
const projectNameMain = document.querySelector("#project-name-main");
const projectDescriptionMain = document.querySelector("#project-description-main");
const editProjectName = document.querySelector("#edit-project-name");
const editProjectDescription = document.querySelector("#edit-project-description");
const tasksContainer = document.querySelector("#tasks-container");



function renderProjects(){
    clearProjects();
    allProjects.forEach((project, index)=>{
        const projects = document.createElement('div');
        projects.dataset.value = index;
        projects.classList.add('projects');
        if(project.active) projects.classList.add('active');

        projects.textContent = project.name;

        const trashImage = document.createElement('img');
        trashImage.classList.add('trash-image');
        trashImage.src = "./../dist/img/trash-image.png";

        projects.appendChild(trashImage);
        projectContainer.appendChild(projects);
    });
    createProjectBtnListeners();
}

function clearProjects(){
    projectContainer.innerHTML = "";
}

function renderHeading(){
    projectNameMain.textContent = activeProject().name;
    projectDescriptionMain.textContent = activeProject().description;
    editProjectName.value = activeProject().name;
    editProjectDescription.value = activeProject().description;
}

function renderToDos(){
    clearToDos();
    activeProject().todos.forEach((item, index)=>{
        const to_do = document.createElement('div');
        to_do.classList.add('to-do');
        to_do.dataset.value = index;

        const lefttodo = document.createElement('div');
        lefttodo.classList.add('left-to-do');

        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        if(item.completed) checkbox.classList.add('checked');
        lefttodo.appendChild(checkbox);

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.textContent = item.name;
        lefttodo.appendChild(taskName);

        to_do.appendChild(lefttodo);


        const lefttodoEdit = document.createElement('div');
        lefttodoEdit.classList.add('left-to-do-edit');

        const todoName = document.createElement('input');
        todoName.classList.add('to-do-name');
        todoName.type = 'text';
        todoName.placeholder = "to do name";

        lefttodoEdit.appendChild(todoName);
        to_do.appendChild(lefttodoEdit);

        const righttodo = document.createElement('div');
        righttodo.classList.add('right-to-do');

        const taskTime = document.createElement('div');
        taskTime.classList.add('task-time');
        taskTime.textContent = moment(item.dueDate, "YYYY-MM-DD").fromNow();
        righttodo.appendChild(taskTime);

        const taskEdit = document.createElement('img');
        taskEdit.classList.add('task-edit');
        taskEdit.src = "./../dist/img/pen.png";
        taskEdit.alt="yarark";
        righttodo.appendChild(taskEdit);

        const taskDelete = document.createElement('img');
        taskDelete.classList.add('task-delete');
        taskDelete.src = "./../dist/img/trash-image.png";
        righttodo.appendChild(taskDelete);

        to_do.appendChild(righttodo);

        const righttodoEdit = document.createElement('div');
        righttodoEdit.classList.add('right-to-do-edit');

        const toDoDate = document.createElement("input");
        toDoDate.classList.add("to-do-date");
        toDoDate.type = "date";
        righttodoEdit.appendChild(toDoDate);

        const editToDoButtonContainer = document.createElement("div");
        editToDoButtonContainer.classList.add("edit-todo-button-container");

        const editToDoButton = document.createElement("p");
        editToDoButton.classList.add("edit-todo-button");
        editToDoButton.textContent = "Submit";
        editToDoButtonContainer.appendChild(editToDoButton);

        const editToDoCancelButton = document.createElement("p");
        editToDoCancelButton.classList.add("edit-todo-cancel-button");
        editToDoCancelButton.textContent = "Cancel";
        editToDoButtonContainer.appendChild(editToDoCancelButton);

        righttodoEdit.appendChild(editToDoButtonContainer);
        to_do.appendChild(righttodoEdit);
        tasksContainer.appendChild(to_do);
    });
    createToDoBtnListeners();
}

function clearToDos(){
    tasksContainer.innerHTML = "";
}

export {renderProjects, renderHeading, renderToDos};