import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task[] {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return this.tasks;
  }

  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }

  updateStatus(id: string, status: TaskStatus): Task[] {
    this.tasks.map((task) => {
      if (task.id === id) task.status = status;
    });
    return this.tasks;
  }
}
