
export class ToDo{
    constructor(name, detail, dueDate, priority = 1, completed = false){
        this.name = name;
        this.detail = detail;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    getToDOName(){
        return this.name;
    }

    setToDoName(nwnm){
        this.name = nwnm;
    }

    getDetail(){
        return this.detail;
    }

    setDetail(nwdtl){
        this.detail = nwdtl;
    }

    getDate(){
        return this.duedate;
    }

    setDate(nwdue){
        this.duedate = nwdue;
    }

    getPriority(){
        return this.priority;
    }

    setPriority(nwpr){
        this.priority = nwpr;
    }

    isCompleted(){
        return this.completed;
    }

    setCompleted(){
        this.completed = true;
    }

    setIncompleted(){
        this.completed = false;
    }
}



export class Project{
    constructor(name, description, todos = [], active = true){
        this.name = name;
        this.description= description;
        this.todos = todos;
        this.active = active;
    }

    getName(){
        return this.name;
    }

    setName(nwnm){
        this.name = nwnm;
    }

    getDescription(){
        return this.description;
    }

    setDescription(nwds){
        this.description = nwds;
    }

    addToDo(todo){
        this.todos.push(todo);
    }

    isActive(){
        return this.active;
    }

    removeToDo(todo){
        for(let i = 0; i < this.todos.length; i++){
            if(this.todos[i] === todo){
                this.todos.splice(i,1);
            }
        }
    }
}

