
import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: () => {
        try {
          const pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            user: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_DATABASE || 'todo_app',
          });

          
          pool.query('SELECT NOW()', (err) => {
            if (err) {
              console.error('❌ Database connection failed:', err.message);
            } else {
              console.log('✅ Database connected successfully');
            }
          });

          return pool;
        } catch (error) {
          console.error('❌ Failed to create database pool:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}