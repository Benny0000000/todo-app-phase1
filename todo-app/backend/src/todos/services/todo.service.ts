import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';


import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@Inject('PG_CONNECTION') private readonly db: Pool) {}

  async findAll(): Promise<Todo[]> {
    const query = `
      SELECT id, title, description, is_completed as "isCompleted", 
             created_at as "createdAt"
      FROM todos 
      ORDER BY created_at DESC
    `;
    
    const result = await this.db.query(query);
    return result.rows;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const query = `
      INSERT INTO todos (title, description) 
      VALUES ($1, $2) 
      RETURNING id, title, description, is_completed as "isCompleted", 
                created_at as "createdAt"
    `;
    
    const values = [createTodoDto.title, createTodoDto.description || null];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updateTodoDto.title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(updateTodoDto.title);
      paramCount++;
    }

    if (updateTodoDto.description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(updateTodoDto.description);
      paramCount++;
    }

    if (updateTodoDto.isCompleted !== undefined) {
      updates.push(`is_completed = $${paramCount}`);
      values.push(updateTodoDto.isCompleted);
      paramCount++;
    }

    values.push(id);

    const query = `
      UPDATE todos 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount}
      RETURNING id, title, description, is_completed as "isCompleted", 
                created_at as "createdAt"
    `;

    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async toggleComplete(id: number): Promise<Todo> {
    const query = `
      UPDATE todos 
      SET is_completed = NOT is_completed 
      WHERE id = $1
      RETURNING id, title, description, is_completed as "isCompleted", 
                created_at as "createdAt"
    `;
    
    const result = await this.db.query(query, [id]);
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM todos WHERE id = $1';
    await this.db.query(query, [id]);
  }
}