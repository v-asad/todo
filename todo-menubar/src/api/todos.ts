const API_URL = "http://localhost:40404";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
}

export async function createTodo(title: string) {
  return fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

export async function toggleTodo(id: string, completed: boolean) {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
}

export async function deleteTodo(id: string) {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
}
