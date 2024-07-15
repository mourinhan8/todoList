import { Router } from "express";
import asyncHandler from '../../helpers/asyncHandler';
import TodoController from '../../controller/todoController';
import { validationMiddleware } from "../../middlewares/validation";
import { CreateTodoDto } from "../../dto/createTodo.dto";
import { UpdateTodoDto } from "../../dto/updateTodo.dto";

const router = Router();
router.get('/', asyncHandler(TodoController.getListTodo));
router.post('/',
    validationMiddleware(CreateTodoDto),
    asyncHandler(TodoController.createTodo)
);
router.put('/:id',
    validationMiddleware(UpdateTodoDto),
    asyncHandler(TodoController.updateTodo)
);
router.delete('/:id', asyncHandler(TodoController.deleteTodo));

export default router;