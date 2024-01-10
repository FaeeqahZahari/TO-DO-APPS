import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../services/todo-service.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [
    TodoFormComponent,
    CommonModule,
    TodoItemComponent
  ],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent implements OnInit {
  todoService = inject(TodoService);

  /**
   * Initializes the component and performs any necessary setup actions.
   *
   * @return {void} meaning it will return nothing
   */
  ngOnInit(): void {
    this.todoService.getTodos().pipe(take(1)).subscribe();   
  }
  
  /**
   * Retrieves the todos from the todo service.
   *
   * @return {Array} Array of todos
   */
  get todos() {
    return this.todoService.todos();
  }

  
}
