let view = {
    creatTaskUI:function(taskDIV, taskInfo){
        taskDIV.insertAdjacentHTML("afterbegin", `<div class="taskLine" id="${taskInfo.id}">
            <input class="deleteTask" onclick="controller.deleteTaskTable(${taskInfo.id})" type="submit" value="X">
            <p onclick="controller.editTaskTable(${taskInfo.id})">${taskInfo.task}</p>
        </div>`);
    },
    showTasks: function(allTasks){
        let taskList = document.querySelector('#taskArea');
        for(let i=0; i<allTasks.length; i++){
            this.creatTaskUI(taskList, allTasks[i]);
        }
    },
    addTaskInList: function(taskInfo){
        let taskList = document.querySelector('#taskArea');
        this.creatTaskUI(taskList, taskInfo);
    },
    deleteTaskInList: function(idTask){
        let taskList = document.getElementById(idTask).remove();
    },
    editTask: function(idTask, taskInfo){
        let taskList = document.getElementById(idTask);
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        taskList.insertAdjacentHTML("afterbegin",`<textarea id="texta">${taskInfo.task}</textarea>`);
        document.getElementById('texta').focus();
        
        /* Тут уже идет нарушение. View не должен сохранять и изменять данные.
           Но как это исправить я пока не придумал =(
           Буду рад подсказке ;) */
        texta.onblur = function(){
            let textareaInf = {
                id: taskInfo.id, 
                task: texta.value
            }
            document.getElementById('texta').remove();
            taskList.insertAdjacentHTML("afterbegin", `<input class="deleteTask" onclick="controller.deleteTaskTable(${textareaInf.id})" type="submit" value="X">
            <p onclick="controller.editTaskTable(${textareaInf.id})">${textareaInf.task}</p>`)
            
            return textareaInf
        }
    }
}

let model = {
    taskList:[
        {
            id: 0,
            task: 'Первая тестовая запись'
        }
    ],
    addTask: function(text, taskList){
        return {
            id: taskList.length, 
            task: text
        }
    },
    deleteTask: function(id){
        delete this.taskList[id];
    },
    editTask: function(taskId){
        return this.taskList[taskId];
    },
    addChange: function(newInfo){
        this.taskList[newInfo.id].task = newInfo.task;
    }
}

let controller = {
    showTaskTable: function(){
        view.showTasks(model.taskList);
    },
    addTaskTable: function(addText){
        let newTask = model.addTask(addText, model.taskList);
        model.taskList.push(newTask);
        view.addTaskInList(newTask);
    },
    deleteTaskTable: function(idTask){
        model.deleteTask(idTask);
        view.deleteTaskInList(idTask);
    },
    editTaskTable: function(idTask){
        let taskInfo = model.editTask(idTask);
        let textareaInf = view.editTask(idTask, taskInfo);
        model.addChange(textareaInf)
    }
}

controller.showTaskTable();
