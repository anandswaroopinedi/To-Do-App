import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../../Models/Task';
import { TaskService } from '../../../Services/Task/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-menu',
  standalone: true,
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  imports: [CommonModule],
})
export class TaskMenuComponent {
  pageName: string = '';
  tasks: Task[] = [];
  @Output() dataManipulated: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    let name: string | undefined = this.router.url.split('/').pop();
    if (name) this.pageName = name[0].toUpperCase() + name.slice(1);
    this.taskService.taskData$.subscribe((value) => {
      this.tasks = value;
    });
  }
  openTaskInfo(index: number) {
    var taskDetail = document.getElementsByClassName(
      'task-item-info'
    ) as HTMLCollectionOf<HTMLInputElement>;
    taskDetail[index].style.display =
      taskDetail[index].style.display == 'none' ||
      taskDetail[index].style.display == ''
        ? 'flex'
        : 'none';
    this.HideTaskDescriptions(index);
  }
  HideTaskDescriptions(index: number) {
    var taskDetail = document.getElementsByClassName(
      'task-item-info'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < taskDetail.length; i++) {
      if (i != index) taskDetail[i].style.display = 'none';
    }
  }
  delete(id: number) {
    this.taskService.deleteTask(id).subscribe((response) => {
      if (response.statusCode == 200) {
        this.dataManipulated.emit(true);
        this.toaster.success(response.message);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
  ToggleActiveComplete(id: number) {
    if (this.pageName.toLowerCase() == 'active') {
      this.taskService.makeAsCompleted(id).subscribe((response) => {
        if (response.statusCode == 200) {
          this.dataManipulated.emit(true);
          this.toaster.success(response.message);
        } else {
          this.toaster.error(response.message);
        }
      });
    } else if (this.pageName.toLowerCase() == 'completed') {
      this.taskService.makeAsActive(id).subscribe((response) => {
        if (response.statusCode == 200) {
          this.dataManipulated.emit(true);
          this.toaster.success(response.message);
        } else {
          this.toaster.error(response.message);
        }
      });
    }
  }
  openEditForm(task: Task) {
    this.taskService.editTask$.next(task);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest(
      '.task-item, .task-item-info'
    );
    if (!clickedInside) {
      this.HideTaskDescriptions(-1);
    }
  }
  calculateTime(dateTime: any) {
    const createdDate = new Date(dateTime);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const Difference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (Difference == 0) {
      const minDifference = Math.floor(timeDifference / (1000 * 60));
      if (minDifference == 0) {
        return Math.floor(timeDifference / 1000) + ' seconds';
      }
      return minDifference + ' minutes';
    }
    return Difference + ' hours';
  }
}