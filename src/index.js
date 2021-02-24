import {createProject} from "./modules/logic.js";
import {renderProjects, renderHeading, renderToDos} from "./modules/render.js";
import "./modules/staticListeners.js";
 
let allProjects = [];

const data = JSON.parse(localStorage.getItem('user'));

if(data != null){
    // This part works if local storage is not empty.
    allProjects = JSON.parse(window.localStorage.getItem('user'));
    renderProjects();
    renderHeading();
    renderToDos();
}else{
    let dfpr = createProject();
    allProjects.push(dfpr);
    window.localStorage.setItem('user',  JSON.stringify(allProjects));
    renderToDos();
}

//window.localStorage.clear();

export {allProjects};


