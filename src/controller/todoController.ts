import { Request, Response } from 'express';
import AppDataSource from '../dataSource';
import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../types/todo';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { CREATED, SuccessResponse } from '../core/success.response';
import { Not } from 'typeorm';
import { NotFoundError } from '../core/error.response';
import { convertEmptyStringsToNull } from '../utils';

const todoRepository = () => AppDataSource.getRepository(Todo);
export default class TodoController {
  static getListTodo = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;
    if (limit > 20) {
      limit = 20;
    }
    const skip = (page - 1) * limit;
    const [todos, total] = await todoRepository().findAndCount({
      where: {
        status: Not(TodoStatus.DELETED)
      },
      order: {
        createdAt: 'DESC'
      },
      skip,
      take: limit,
    });
    new SuccessResponse({
      message: 'Get list success',
      metadata: {
        data: todos,
        pagination: {
          page,
          limit,
          total
        }
      }
    }).send(res);
  };

  static createTodo = async (req: Request, res: Response) => {
    const createTodoData: CreateTodoDto = req.body;
    const todo = todoRepository().create(createTodoData);
    await todoRepository().save(todo);
    new CREATED({
      message: 'Create success',
      metadata: todo,
    }).send(res);
  };

  static updateTodo = async (req: Request, res: Response) => {
    const {
      id
    } = req.params;
    let {
      command,
      ...dataUpdate
    } = req.body;
    const todo = await todoRepository().findOne({
      where: {
        id: Number(id),
        status: Not(TodoStatus.DELETED)
      }
    });
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }
    if (command === 'completed') {
      todo.status = TodoStatus.DONE;
    }
    if (command === 'doing') {
      todo.status = TodoStatus.DOING;
    }
    if (command === 'update') {
      if (dataUpdate.endDate && !dataUpdate.startDate) {
        delete dataUpdate.startDate;
      }
      dataUpdate = convertEmptyStringsToNull(dataUpdate);
      todoRepository().merge(todo, dataUpdate);
    }
    const result = await todoRepository().save(todo);

    new SuccessResponse({
      message: `${command} success`,
      metadata: result
    }).send(res);
  };

  static deleteTodo = async (req: Request, res: Response) => {
    const {
      id
    } = req.params;
    const todo = await todoRepository().findOne({
      where: {
        id: Number(id),
        status: Not(TodoStatus.DELETED)
      }
    });
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.status = TodoStatus.DELETED;
    const result = await todoRepository().save(todo);
    new SuccessResponse({
      message: 'Delete success',
      metadata: result.status
    }).send(res);
  };
}