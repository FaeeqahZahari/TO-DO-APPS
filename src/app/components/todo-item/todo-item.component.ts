import { Component, Input, inject } from '@angular/core';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo-service.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  // receives the todo item from the parent component
  @Input({ required: true }) todo!: ITodo;
  todoService = inject(TodoService);

  // toggles the completed status of the todo item
  updateTodo() {
    this.todoService.updateTodo({...this.todo, completed: !this.todo.completed})
    .pipe(take(1))
    .subscribe();
  }

  // deletes the todo item by querying the id
  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id!).pipe(take(1)).subscribe();
  }

}
