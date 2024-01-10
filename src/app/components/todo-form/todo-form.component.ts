import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo-service.service';
import { take, tap } from 'rxjs';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})

export class TodoFormComponent {
  todoService = inject(TodoService);
  fb = inject(FormBuilder);

  // use Angular's formbuilder to create a form group with two form controls: title and completed
  newTodoForm = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    completed: new FormControl(false)
  })
  onSubmit() {
    // if the input is not valid, immediately return (break out of function)
    if(this.newTodoForm.invalid) return;

    // add todo if success
    this.todoService.addTodo(this.newTodoForm.value as ITodo)
    // use pipe function to chain multiple RxJS operators together
    .pipe(
      // takes only the first emisison from the observable (make sure operation is only executed once)
      take(1),
      // tap operator is used to perform an action on each emission of the observable
      tap(() => this.newTodoForm.reset({ completed: false, title: ''}))
    )
    // subscribe to the observable, thus activating the oprations defined above
    .subscribe();
  }

}

