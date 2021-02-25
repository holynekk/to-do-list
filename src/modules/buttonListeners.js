
import {switchActiveProject, deleteProject, completeToDo, incompleteToDo, deleteToDo, storeLocally} from "./logic.js";
import {renderToDos} from "./render.js";
import {editToDo} from "./domFunctionality.js";

function createProjectBtnListeners(){
    let projects = document.querySelectorAll(".projects");
    projects.forEach(button => button.addEventListener('click', function(e){
        if(e.target.className == "trash-image"){
            // Do nothing.
        } 
        else{
            switchActiveProject(e.target.dataset.value);
            storeLocally();
        }
    }))
    let trashImage = document.querySelectorAll(".trash-image");
    trashImage.forEach(deleteBtn => deleteBtn.addEventListener('click', function(e){
        deleteProject(e.target.parentNode.dataset.value);
        storeLocally();
    }))
}

function createToDoBtnListeners(){
    let checkBox = document.querySelectorAll('.checkbox');
    checkBox.forEach(button=>{
        button.addEventListener("click", (e)=>{
            if(e.target.classList.contains("checked")){
                incompleteToDo(e.target.parentNode.parentNode.dataset.value);
            }else{
                completeToDo(e.target.parentNode.parentNode.dataset.value);
            }
            storeLocally();
            renderToDos();
        });
    });

    let taskName = document.querySelectorAll(".task-name");
    taskName.forEach(button => button.addEventListener('click', function(e){
        editToDo.show(e.target.parentNode.parentNode.dataset.value);
    }));

    let taskTime = document.querySelectorAll(".task-time");
    taskTime.forEach(button => button.addEventListener('click', function(e){
        editToDo.show(e.target.parentNode.parentNode.dataset.value);
    }));

    let taskEdit = document.querySelectorAll('.task-edit');
    taskEdit.forEach(button =>{
        button.addEventListener("click",(e)=>{
            editToDo.show(e.target.parentNode.parentNode.dataset.value);
        });
    });

    let taskDelete = document.querySelectorAll(".task-delete");
    taskDelete.forEach(button => button.addEventListener('click', function(e){
        deleteToDo(e.target.parentNode.parentNode.dataset.value);
        storeLocally();
    }));

    let editToDoCancelButton = document.querySelectorAll(".edit-todo-cancel-button");
    editToDoCancelButton.forEach(button => button.addEventListener('click', function(e){
        editToDo.hide(e.target.parentNode.parentNode.parentNode.dataset.value);
    }));
    
    let editToDoButton = document.querySelectorAll(".edit-todo-button");
    editToDoButton.forEach(button => button.addEventListener('click', function(e){
        editToDo.submit(e.target.parentNode.parentNode.parentNode.dataset.value);
    }));
}

export {createProjectBtnListeners, createToDoBtnListeners};