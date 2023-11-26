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

  addTaskValue : string = '';
  addTaskCategory : string = '';
  editTaskValue : string = '';
  editTaskCategory : string = '';
  isToggleDisabled: boolean | undefined;
  idToToogle: number | undefined;
  urgent: boolean | undefined;
  searchValue: string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.addTaskCategory = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res.reverse();
      this.filteredTaskArr = [...this.taskArr]; 
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.task_category = this.addTaskCategory;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      console.log(err)
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.task_category = this.editTaskCategory;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }
  taskDone(e:Task) {
    this.crudService.editDone(e).subscribe(res => {
     console.log(e, 'e');
     
    }, err=> {
      alert("Failed to update task");
    })
  }

  toggleItemState(task: Task) {
    if (task.urgent == false){
      task.urgent = true
    }else{
      task.urgent = false
    }
    this.isToggleDisabled = true;
    this.idToToogle = task.id;
    this.crudService.editUrgent(task).subscribe(res => {
      console.log(task, res, 'taskToggle');
      const updatedStatus = this.taskArr.map((item) => {
        if (item.id === res.id) {
          return { ...item, urgent: res.urgent };
        }
        return item;
      });
      this.isToggleDisabled = false;
      this.idToToogle = -1;
      this.taskArr = updatedStatus;
      
     }, err=> {
       alert("Failed to update task");
     })
   }

      
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    this.editTaskCategory = etask.task_category;
  }
// search
applyFilter(filterValue: any) {
  console.log(filterValue) 
  if (this.taskArr) {
  filterValue = filterValue.trim().toLowerCase();
  this.filteredTaskArr = this.taskArr.filter(task =>
    
    task.task_category.toLowerCase().includes(filterValue) 
  );
}

}

// filter importance

filterChange(e: MatSelectChange) {
  this.filterBy(e.value)
}
filterBy(value:string){
  if (value == 'enabled') {
    const filtered = this.taskArr.filter((item) => {
      return item.urgent == true;
    });
    this.filteredTaskArr = filtered;

  } else if (value == 'disabled') {
    const filtered = this.taskArr.filter((item) => {
      return item.urgent == false;
    });
    this.filteredTaskArr = filtered;
  } else {
    this.filteredTaskArr = this.taskArr;
  }
}

}