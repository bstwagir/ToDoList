import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = []; 
  filteredTaskArr: Task[] = [];
  filteredTaskArrCompleted: Task[] = [];
  filteredTaskCompleted: Task[] = [];
  filteredTaskArrNotCompleted: Task[] = [];
  filteredTaskNotCompleted: Task[] = [];


  addTaskValue : string = '';
  addTaskCategory : string = '';
  editTaskValue : string = '';
  editTaskCategory : string = '';
  isToggleDisabled: boolean | undefined;
  idToToogle: number | undefined;
  urgent: boolean | undefined;
  searchValue: string = '';
  isEmpty: boolean | undefined
  filterValue: string = "";

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.addTaskCategory = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  // Get all tasks from the database
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res.reverse();
      this.filterTasks();

      this.filteredTaskArrCompleted = [...this.taskArr] .filter((item) => {
        return item.done == true;
      });

      this.filteredTaskArrNotCompleted = [...this.taskArr].filter((item) => {
        return item.done == false;
      });

      this.checkCompletedList()

    }, err => {
      alert("Unable to get list of tasks");
    });
  };

  // filter tasks by completion
  filterTasks() {
    this.filteredTaskArr = [...this.taskArr];
  
    this.filteredTaskCompleted = this.filteredTaskArr.filter(
      (task) => task.done === true
    );
  
    this.filteredTaskNotCompleted = this.filteredTaskArr.filter(
      (task) => task.done === false
    );
  }

  // check if the completed list is empty
  checkCompletedList() {
    if(this.filteredTaskCompleted.length > 0){
      this.isEmpty = false
    }else {
      this.isEmpty = true 
    }
  }

  // Create a new task
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.task_category = this.addTaskCategory;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert(err);
    })
  }

  // update/edit a single task
  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.task_category = this.editTaskCategory;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  // mark a task as completed
  taskDone(e:Task) {
    this.crudService.editDone(e).subscribe(res => {
     this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  // mark a task as important
  toggleItemState(task: Task) {
    if (task.urgent == false){
      task.urgent = true
    }else{
      task.urgent = false
    }
    this.isToggleDisabled = true;
    this.idToToogle = task.id;
    this.crudService.editUrgent(task).subscribe(res => {
      const updatedStatus = this.taskArr.map((item) => {
        if (item.id === res.id) {
          return { ...item, urgent: res.urgent };
        }
        return item;
      });
      this.isToggleDisabled = false;
      this.idToToogle = -1;
      this.taskArr = updatedStatus;
      this.ngOnInit()
      
     }, err=> {
       alert("Failed to update task");
     })
   }

  // delete a single task
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  //lauch the update pop-up
  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    this.editTaskCategory = etask.task_category;
  }
  
// search
applyFilter(filterValue: any) {
  if (this.taskArr) {
  filterValue = filterValue.trim().toLowerCase();
  this.filteredTaskNotCompleted = this.taskArr.filter(task =>
    task.task_name.toLowerCase().includes(filterValue) ||
    task.task_category.toLowerCase().includes(filterValue) 
  );
  this.filteredTaskCompleted = this.taskArr.filter(task =>
    task.task_name.toLowerCase().includes(filterValue) ||
    task.task_category.toLowerCase().includes(filterValue) 
  );
  }
}

// filter through importance state of tasks

filterChange(e: MatSelectChange) {
  this.filterBy(e.value)
}
filterBy(value:string){
  if (value == 'enabled') {
    const filteredC = this.filteredTaskArrCompleted.filter((item) => {
      return item.urgent == true;
    });
    const filteredN = this.filteredTaskArrNotCompleted.filter((item) => {
      return item.urgent == true;
    });
    this.filteredTaskCompleted = filteredC;
    this.filteredTaskNotCompleted = filteredN;

  } else if (value == 'disabled') {
    const filteredC = this.filteredTaskArrCompleted.filter((item) => {
      return item.urgent == false;
    });
    const filteredN = this.filteredTaskArrNotCompleted.filter((item) => {
      return item.urgent == false;
    });
    this.filteredTaskCompleted = filteredC;
    this.filteredTaskNotCompleted = filteredN;
  } else {
    this.filteredTaskCompleted = this.filteredTaskArrCompleted 
    this.filteredTaskNotCompleted = this.filteredTaskArrNotCompleted
  }
}

}