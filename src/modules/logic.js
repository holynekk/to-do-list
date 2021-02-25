import {Project, ToDo} from "./elements.js";
import {allProjects} from "./../index.js";
import {renderHeading, renderProjects, renderToDos} from "./render.js";
import { addToDo, editHeadingDom } from "./domFunctionality.js";

function createProject(name = "Default Project", description = "Nothing", todos = [], active = true){
    //let today = new Date();
    //let todaysDate = today.getFullYear()+'-'+today.getDate()+'-'+(today.getMonth()+1);

    let nwProject = new Project(name, description, todos, active);
    let nwToDo = createToDo();

    nwProject.addToDo(nwToDo);

    return nwProject;
}


function createToDo(name = "Default Task", detail = "Nothing", duedate = "2023-01-01", priority = 1, completed = false){
    let newToDo = new ToDo(name, detail, duedate, priority, completed);
    return newToDo;
}


function makeAllInactive(){
    allProjects.forEach(element => {
        element.active = false;
    });
}   


function storeLocally(){
    window.localStorage.setItem('user', JSON.stringify(allProjects));
}

function activeProject(){
    //console.log(allProjects);
    let activeProjectArray = allProjects.filter(project => project.active);
    return activeProjectArray[0];
}

function completeToDo(index){
    activeProject().todos[index].completed = true;
}

function incompleteToDo(index){
    activeProject().todos[index].completed = false;
}

function deleteToDo(index){
    activeProject().todos.splice(index, 1);
    renderToDos();
}

function switchActiveProject(index){
    makeAllInactive();
    allProjects[index].active = true;
    renderProjects();
    renderHeading();
    renderToDos();
    editHeadingDom.hide();
    addToDo.hide();
}

function deleteProject(index){
    if(allProjects.length > 1){
        if(allProjects[index] == activeProject()){
            if(index != 0){
                allProjects[index-1].active = true;
                allProjects.splice(index, 1);
            }else{
                allProjects[1].active = true;
                allProjects.splice(index, 1);
            }
        }else{
            allProjects.splice(index, 1);
        }
    }
    renderProjects();
    renderHeading();
    renderToDos();
}

export {createProject, createToDo, activeProject, switchActiveProject, deleteProject, completeToDo, incompleteToDo, deleteToDo, storeLocally};