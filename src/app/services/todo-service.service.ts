import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITodo } from '../interfaces/ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // creating a variable to store all the todos from API
  todos = signal<ITodo[]>([]);
  
  private readonly apiUrl = 'http://localhost:3000/todos';
    http = inject(HttpClient);

   getTodos(): Observable<ITodo[]>{
    return this.http.get<ITodo[]>(this.apiUrl).pipe(tap((res) => this.todos.set(res)));
   }

   addTodo(todo: ITodo): Observable<ITodo>{
    return this.http.post<ITodo>(this.apiUrl, todo).pipe(
      tap((newTodo) => this.todos.update((todos) => [...todos, newTodo]))
    );
   }

   updateTodo(todo: ITodo): Observable<ITodo>{
     return this.http.patch(`${this.apiUrl}/${todo.id}`, todo)
     .pipe(
      tap((updatedTodo: any) =>
        this.todos.update((todos) =>
          todos.map((t) => (t.id === todo.id ? updatedTodo : t))
        )
      )
    );
   }            

   deleteTodo(id: string): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.apiUrl}/${id}`).pipe(
      tap(() =>
          this.todos.update((todos) => todos.filter((todo) => todo.id.toString() !== id))
        )
    );
   }

}
