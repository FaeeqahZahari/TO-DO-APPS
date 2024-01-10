import { Routes } from '@angular/router';
import { TodoTableComponent } from './components/todo-table/todo-table.component';

export const routes: Routes = [
    {path: '', component: TodoTableComponent},
    {path: '*', component: TodoTableComponent}
];
