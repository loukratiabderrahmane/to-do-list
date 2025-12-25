let tasks = [
    {
        "title" : 'Read Book',
        "date" : '12/19/2025',
        "isDone" : false
    }
]
getTasksfromStorage()



const add = document.getElementById("add")
let tasksContainer = document.getElementById("tasks")

function fillTasksOnThePage(){
    tasksContainer.innerHTML = "";
    tasks.forEach((task,index) => {
        let doneClass = task.isDone ? "done" : "";
        let content = `<div class="task ${doneClass}" >
            <div class="text">
                <h2>${task.title}</h2>
                <p class="date"><span class="material-symbols-outlined">
                    calendar_month
                    </span>${task.date}</p>
                    </div>
                    
                    <div class="btn">
                        <button  class="delete">
                            <span class="material-symbols-outlined">
                                delete
                                </span>
                                </button>
                                ${task.isDone ?
                                `<button class="check close">
                                    <span class="material-symbols-outlined">
                    close
                    </span>
                    </button>`
                    :
                    `<button class="check">
                        <span class="material-symbols-outlined">
                    check
                    </span>
                    </button>`
                    }
                    <button class="update">
                        <span class="material-symbols-outlined">
                            edit
                            </span>
                    </button>
                    </div>
                </div>
                            `
                            
        tasksContainer.innerHTML += content
                        }); 
                    }
                    
                    
fillTasksOnThePage()
// Create
add.addEventListener("click",function(){
    const now = new Date();
    // Date
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    // Heure
    const hh = String(now.getHours()).padStart(2, '0');      
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0')
    // Format complet
    const dateCreation = `${dd}/${mm}/${yyyy} | ${hh}:${min}:${sec}`;
    
    
    let taskName = prompt("Enter your task :")
    let taskObject = {
        "title" : taskName,
        "date" : dateCreation,
        "isDone" : false
    }
    tasks.push(taskObject)
    
    storetasks()
    
    fillTasksOnThePage()
})

// Delete and Update
tasksContainer.addEventListener("click",function(e){
    const now = new Date();
    // Date
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    // Heure
    const hh = String(now.getHours()).padStart(2, '0');      
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0')
    // Format complet
    const dateCreation = `${dd}/${mm}/${yyyy} | ${hh}:${min}:${sec}`;
    
    if(e.target.closest(".delete")){
        let taskDiv = e.target.closest(".task")
        let index = [...tasksContainer.children].indexOf(taskDiv)
        if(confirm("Do u really want To delete : "+tasks[index].title)){
            tasks.splice(index,1)
            storetasks()
            fillTasksOnThePage()
        }
        
        let taskstring = JSON.stringify(tasks)
        localStorage.setItem("tasks",taskstring)
        
    }else if(e.target.closest(".update")){
        let taskDiv = e.target.closest(".task")
        let index = [...tasksContainer.children].indexOf(taskDiv)
        let task = tasks[index]
        let taskName =prompt(`Enter a new Title of : ${tasks[index].title}:`,task.title)
        if(taskName != null){
            task.title = taskName
            storetasks()
            fillTasksOnThePage()
    }
        
        
    }else if(e.target.closest(".check")){
        let taskDiv = e.target.closest(".task")
        let index = [...tasksContainer.children].indexOf(taskDiv)
        let task = tasks[index]
        task.isDone = !task.isDone

        storetasks()
        fillTasksOnThePage()
    }})


    // Getters and Setters From Local Storage

    function getTasksfromStorage(){
        tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks = tasks ?? []
        // meme code que:
        // if(tasks == null){
        //     tasks = []
        // }
    }
    function storetasks(){
        let taskstring = JSON.stringify(tasks)
        localStorage.setItem("tasks",taskstring)
    }
                      