import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor( private http : HttpClient) { 
  this.serviceURL = "http://localhost:3000/tasks"
  }

  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.serviceURL,task);
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id,task);
  }
  editDone(task : Task) : Observable<Task> {
    console.log(task.done, task, 'service');
    
    return this.http.put<Task>(this.serviceURL+'/'+task.id,{
      task_name:task.task_name,
      task_category: task.task_category,
      done: !task.done,
      urgent: task.urgent,
    });
  }
  editUrgent(task : Task) : Observable<Task> {
    console.log(task.done, task, 'service');
    
    return this.http.put<Task>(this.serviceURL+'/'+task.id,{
      task_name:task.task_name,
      task_category: task.task_category,
      done: task.done,
      urgent: task.urgent,
    });
  }
}
