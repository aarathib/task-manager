import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (filterDto) {
      return this.tasksService.getTasksWithFilter(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task[] {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Task[] {
    const { status } = updateStatusDto;
    return this.tasksService.updateStatus(id, status);
  }
}
