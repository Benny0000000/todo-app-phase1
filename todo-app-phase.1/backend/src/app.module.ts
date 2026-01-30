import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    DatabaseModule,
    TodoModule,
  ],
})
export class AppModule {}