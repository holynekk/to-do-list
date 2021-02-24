import { allProjects } from "../index.js";
import {createProject, activeProject, createToDo, storeLocally} from "./logic.js";
import {renderProjects, renderHeading, renderToDos} from "./render.js";


const newProjectDom = (() => {
    const addProjectBtn = document.querySelector("#add-project");
    const addProjectWindowContainer = document.querySelector("#add-project-window-container");
    const addTaskBtn = document.querySelector("#add-project-button");
    const cancelBtn = document.querySelector("#add-project-cancel-button");
    const projectNameInput = document.querySelector("#project-name");
    const projectDescriptionInput = document.querySelector("#project-description");

    function show(){
        addProjectWindowContainer.style.display="flex";
    }

    function hide(){
        addProjectWindowContainer.style.display="none";
        clear();
    }

    function clear(){
        projectNameInput.value="";
        projectDescriptionInput.value="";
    }

    function addProject(){
        if(projectNameInput.value != ""){
            let nwprj = createProject(projectNameInput.value, projectDescriptionInput.value);
            allProjects.push(nwprj);
            hide();
            renderProjects();
            storeLocally();
        }
        else{
            errorMessageDom.show();
        }
    }

    return{
        show,
        hide,
        addProject,
        addProjectBtn,
        addTaskBtn,
        cancelBtn,
    };
})();


const editToDo = (()=>{
    function show(index){
        const leftToDo = document.querySelectorAll(".left-to-do");
        const rightToDo = document.querySelectorAll(".right-to-do");
        const leftToDoEdit = document.querySelectorAll(".left-to-do-edit");
        const rightToDoEdit = document.querySelectorAll(".right-to-do-edit");
        const toDoName = document.querySelectorAll(".to-do-name");
        const toDoDate = document.querySelectorAll(".to-do-date");

        leftToDo[index].style.display="none";
        rightToDo[index].style.display="none";
        leftToDoEdit[index].style.display="flex";
        rightToDoEdit[index].style.display="flex";

        toDoName[index].value = activeProject().todos[index].name;
        toDoDate[index].value = activeProject().todos[index].dueDate;
    }

    function hide(index){
        const _leftToDo = document.querySelectorAll(".left-to-do");
        const _rightToDo = document.querySelectorAll(".right-to-do");
        const _leftToDoEdit = document.querySelectorAll(".left-to-do-edit");
        const _rightToDoEdit = document.querySelectorAll(".right-to-do-edit");
        _leftToDo[index].style.display="flex";
        _rightToDo[index].style.display="flex";
        _leftToDoEdit[index].style.display="none";
        _rightToDoEdit[index].style.display="none";
    }

    function submit(index){
        const toDoName = document.querySelectorAll(".to-do-name");
        const toDoDate = document.querySelectorAll(".to-do-date");
        if(toDoName[index].value == "" || toDoDate[index].value == ""){
            errorMessageDom.show();
        }
        else{
            activeProject().todos[index].name = toDoName[index].value;
            activeProject().todos[index].dueDate = toDoDate[index].value;
            renderToDos();
            storeLocally();
        }
    }

    return {show, hide, submit};
})();

const addToDo = (() => {
    const addTask = document.querySelector("#add-task");
    const addToDoButton = document.querySelector(".add-todo-button");
    const addToDoCancelButton = document.querySelector(".add-todo-cancel-button");
    const toDoAdd = document.querySelector(".to-do-add");
    const addToDoName = document.querySelector(".add-to-do-name");
    const addToDoDate = document.querySelector(".add-to-do-date");

    function show(){
        addToDoName.value = "Default Task";
        addToDoDate.value = "2020-12-31";
        toDoAdd.style.display = "flex";
        addTask.style.display = "none";
    }

    function hide(){
        toDoAdd.style.display = "none";
        addTask.style.display = "flex";
        clear();
    }

    function clear(){
        addToDoName.value = "";
        addToDoDate.value = "";
    }

    function submit(){
        if(addToDoName.value == "" || addToDoDate.value == ""){
            errorMessageDom.show();
        }
        else{
            let totoDo = createToDo(addToDoName.value, addToDoDate.value);
            activeProject().todos.push(totoDo);
            hide();
            renderToDos();
            storeLocally();
        }
    }

    return{
        addTask,
        addToDoButton,
        addToDoCancelButton,
        show,
        hide,
        submit,
    }
})();

const editHeadingDom = (() => {
    const _projectInfoContainer = document.querySelector("#project-info-container");
    const _editProjectInfoContainer = document.querySelector("#edit-project-info-container");
    const _editProjectName = document.querySelector("#edit-project-name");
    const _editProjectDescription = document.querySelector("#edit-project-description");
    const editProjectInfoIcon = document.querySelector("#edit-project-info-icon");
    const editProjectButton = document.querySelector("#edit-project-button");
    const editProjectCancelButton = document.querySelector("#edit-project-cancel-button");

    function show(){
        _projectInfoContainer.style.display = "none";
        _editProjectInfoContainer.style.display = "flex";
    }

    function submit(){
        activeProject().name = _editProjectName.value;
        activeProject().description = _editProjectDescription.value;
        hide();
        renderProjects();
        renderHeading();
        storeLocally();
    }

    function hide(){
        _editProjectInfoContainer.style.display = "none";
        _projectInfoContainer.style.display = "flex";
    }

    return{
        show,
        hide,
        submit,
        editProjectInfoIcon,
        editProjectButton,
        editProjectCancelButton,
    }
})();

const errorMessageDom = (() => {
    const _errorMessageContainer = document.querySelector("#error-message-container");
    const errorMessageButton = document.querySelector("#error-message-button");

    function show(){
        _errorMessageContainer.style.display = "flex";
    }

    function hide(){
        _errorMessageContainer.style.display = "none";
    }

    return{
        show,
        hide,
        errorMessageButton,
    }
})();

export {editToDo, addToDo, editHeadingDom, newProjectDom, errorMessageDom};