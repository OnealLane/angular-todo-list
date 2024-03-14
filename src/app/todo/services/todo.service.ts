import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  http = inject(HttpClient);
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/todo`, { title: title }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(id: number): Promise<Todo> {
    // TODO: replace with a PUT request
    const todo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/todo/${id}`));
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodoResponse = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${id}`, updatedTodo));
    // @ts-ignore
    return updatedTodoResponse;
  }
}


