import { Injectable } from '@angular/core';
import { WebApiUrls } from '../../Api Urls/WebApiUrls';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../Models/Task';
import { ApiResponse } from '../../Models/ApiResponse';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskData$:Subject<Task[]>;
  constructor(private apiUrls:WebApiUrls,private http:HttpClient) 
  {
    this.taskData$=new Subject<Task[]>()
  }
  createTask(t:Task):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(this.apiUrls.createTask,t);
  } 
  updateTask(t:Task):Observable<ApiResponse>
  {
    return this.http.put<ApiResponse>(this.apiUrls.updateTask,t);
  }
  deleteTask(id:number):Observable<ApiResponse>
  {
    return this.http.delete<ApiResponse>(this.apiUrls.deleteTask+id);
  }
  getAllTasks():Observable<ApiResponse>
  {
    return this.http.get<ApiResponse>(this.apiUrls.getAllTasks);
  }
  getActiveTasks():Observable<ApiResponse>
  {
    return this.http.get<ApiResponse>(this.apiUrls.getActiveTasks);
  }
  getCompletedTasks():Observable<ApiResponse>
  {
    return this.http.get<ApiResponse>(this.apiUrls.getCompletedTasks);
  }
  deleteAllTasks():Observable<ApiResponse>
  {
    return this.http.delete<ApiResponse>(this.apiUrls.deleteAllTasks);
  }
  getCompletionpercentage():Observable<ApiResponse>
  {
    return this.http.get<ApiResponse>(this.apiUrls.getCompletionPercentage);
  }
  makeAsCompleted(id:number):Observable<ApiResponse>
  {
    debugger;
    return this.http.post<ApiResponse>(this.apiUrls.makeCompleted,id);
  }
}