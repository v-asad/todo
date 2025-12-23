export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export class TodoHub {
  private static todos: TodoItem[] = [];
  private static readonly baseUrl = "http://localhost:40404";

  /** Read-only snapshot */
  static async getAll(): Promise<readonly TodoItem[]> {
    try {
      const res = await fetch(`${this.baseUrl}/todos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to get todos");

      const todos = await res.json();

      this.todos = todos;
    } catch (err) {
      console.error(err);
    }

    return this.todos;
  }

  /** Add a todo */
  static async add(title: string): Promise<TodoItem> {
    const tempTodo: TodoItem = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    // optimistic update
    this.todos.push(tempTodo);

    try {
      const res = await fetch(`${this.baseUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const saved: TodoItem = await res.json();

      // replace temp with backend version
      this.todos = this.todos.map((t) => (t.id === tempTodo.id ? saved : t));

      return saved;
    } catch (err) {
      // rollback
      this.todos = this.todos.filter((t) => t.id !== tempTodo.id);
      throw err;
    }
  }

  /** Complete a todo */
  static async complete(id: string): Promise<void> {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    const prev = todo.completed;
    todo.completed = true;

    try {
      const res = await fetch(`${this.baseUrl}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      if (!res.ok) throw new Error("Failed to complete todo");
    } catch (err) {
      // rollback
      todo.completed = prev;
      throw err;
    }
  }

  /** Delete a todo */
  static async delete(id: string): Promise<void> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return;

    const [removed] = this.todos.splice(index, 1);

    try {
      const res = await fetch(`${this.baseUrl}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete todo");
    } catch (err) {
      // rollback
      this.todos.splice(index, 0, removed);
      throw err;
    }
  }
}
