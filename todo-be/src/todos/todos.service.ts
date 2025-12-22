import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  findAll() {
    return this.todoModel.find().sort({ createdAt: -1 });
  }

  create(dto: CreateTodoDto) {
    return this.todoModel.create(dto);
  }

  async update(id: string, dto: UpdateTodoDto) {
    const todo = await this.todoModel.findByIdAndUpdate(id, dto, { new: true });

    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async delete(id: string) {
    const todo = await this.todoModel.findByIdAndDelete(id);
    if (!todo) throw new NotFoundException('Todo not found');
  }
}
