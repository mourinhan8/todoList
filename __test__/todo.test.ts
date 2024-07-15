import request from 'supertest';
import app from '../src/app'; // import your Express app
import { Todo } from '../src/entities/todo.entity';
import { CreateTodoDto } from '../src/dto/createTodo.dto';
import { UpdateTodoDto } from '../src/dto/updateTodo.dto';
import AppDataSource from '../src/dataSource';

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.query('DELETE FROM todo');
  console.log('Database initialized successfully');
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Todo API', () => {
  let todo: Todo;

  it('should create a new todo', async () => {
    const createTodoData: CreateTodoDto = {
      title: 'Test Todo',
      startDate: "2024-07-16",
      endDate: "2024-07-18",
    };

    const response = await request(app)
      .post('/todo')
      .send(createTodoData)
      .expect(201);

    todo = response.body.metadata;
    expect(todo.title).toBe(createTodoData.title);
    expect(todo.status).toBe('doing');
  });

  it('should validation error when title is empty', async () => {
    const createTodoData: CreateTodoDto = {
      title: '',
    };
    const response = await request(app)
      .post('/todo')
      .send(createTodoData)
      .expect(400);

    const msg = response.body.message;
    expect(msg).toBe('Validation failed');
  });

  it('should get todos with pagination', async () => {
    const response = await request(app)
      .get('/todo?page=1&limit=10')
      .expect(200);

    expect(response.body.metadata.data).toHaveLength(1);
    expect(response.body.metadata.data[0].title).toBe(todo.title);
  });

  it('should complete a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      command: 'completed',
      title: 'Jest Updated Todo 2',
    };

    const response = await request(app)
      .put(`/todo/${todo.id}`)
      .send(updateTodoDto)
      .expect(200);

    expect(response.body.metadata.title).not.toBe(updateTodoDto.title);
    expect(response.body.metadata.status).toBe('done');
  });

  it('should incomplete a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      command: 'doing',
    };

    const response = await request(app)
      .put(`/todo/${todo.id}`)
      .send(updateTodoDto)
      .expect(200);

    expect(response.body.metadata.status).toBe('doing');
  });

  it('should update a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      command: 'update',
      title: 'Jest Updated Todo',
    };

    const response = await request(app)
      .put(`/todo/${todo.id}`)
      .send(updateTodoDto)
      .expect(200);

    expect(response.body.metadata.title).toBe(updateTodoDto.title);
  });

  it('should remove start and end date', async () => {
    const updateTodoData: UpdateTodoDto = {
      command: 'update',
      startDate: '',
      endDate: '',
    };
    const response = await request(app)
      .put(`/todo/${todo.id}`)
      .send(updateTodoData)
      .expect(200);

    expect(response.body.metadata.startDate).toBe(null);
  });

  it('should delete a todo', async () => {
    const response = await request(app)
      .delete(`/todo/${todo.id}`)
      .expect(200);

    expect(response.body.metadata).toBe('deleted');
  });

  it('should not return deleted todos', async () => {
    const response = await request(app)
      .get('/todo')
      .expect(200);

    expect(response.body.metadata.data).toHaveLength(0);
  });
});
