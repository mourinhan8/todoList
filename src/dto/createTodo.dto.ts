import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength
} from 'class-validator';
import { TodoStatus } from '../types/todo';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80,
    { message: 'Title must be at most 80 characters' }
  )
  title: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @Matches(
    /^\d{4}-\d{2}-\d{2}$/,
    {
      message: 'startDate must be in YYYY-MM-DD format'
    })
  startDate?: string;

  @IsOptional()
  @Matches(
    /^\d{4}-\d{2}-\d{2}$/,
    {
      message: 'startDate must be in YYYY-MM-DD format'
    })
  endDate?: string;
}
