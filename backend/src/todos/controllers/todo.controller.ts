import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos() {
    const todos = await this.todoService.findAll();
    return {
      success: true,
      data: todos,
      count: todos.length
    };
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);
    return {
      success: true,
      message: 'Todo created successfully',
      data: todo
    };
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    const todo = await this.todoService.update(id, updateTodoDto);
    return {
      success: true,
      message: 'Todo updated successfully',
      data: todo
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    await this.todoService.delete(id);
  }

  @Patch(':id/toggle')
  async toggleTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.toggleComplete(id);
    return {
      success: true,
      message: 'Todo toggled successfully',
      data: todo
    };
  }
}