import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength
} from 'class-validator';
import { CommandUpdateTodo } from '../types/todo';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsEnum(CommandUpdateTodo)
  command: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Title should not be an empty string' })
  @IsString()
  @MaxLength(80,
    { message: 'Title must be at most 80 characters' }
  )
  title?: string;

  @IsOptional()
  @Matches(
    /^(?:\d{4}-\d{2}-\d{2}|)$/,
    { message: 'Start date must be in YYYY-MM-DD format or empty' }
  )
  startDate?: string;

  @IsOptional()
  @Matches(
    /^(?:\d{4}-\d{2}-\d{2}|)$/,
    { message: 'Start date must be in YYYY-MM-DD format or empty' }
  )
  endDate?: string;
}
