import { 
  PipeTransform, 
  Injectable, 
  BadRequestException,
  ArgumentMetadata 
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // Validate the value against the Zod schema
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors in a readable way
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));
        
        throw new BadRequestException({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
          timestamp: new Date().toISOString(),
        });
      }
      
      throw new BadRequestException({
        success: false,
        message: 'Invalid request data',
        timestamp: new Date().toISOString(),
      });
    }
  }
}