import Express from 'express';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import TaskTable from '../../database/TaskTable';
import Task from '../../common/Task';
import * as error from '../../common/errorException';
const router = Express.Router();
const taskTable = new TaskTable();

router.get('/', async (req, res) => {
  let tasks: Task[] = [];
  try {
    tasks = await taskTable.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return error.default(error.InternalServerError(), req, res);
  }
});

router.post('/', async (req, res) => {
  try {
    let { id, content, due_date, completed } = req.body;
    if (!content)
      return error.default(error.BadRequest('content is required'), req, res);

    const hexArray: number[] = uuid().replace('-', '').split('', 16).map((hex: string) => parseInt(hex, 16));
    id = Buffer.from(hexArray).toString('base64').replace('==', '');
    if (!completed) completed = false;

    const task = new Task(id, dayjs(), content, dayjs(due_date), completed);
    await taskTable.append(task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return error.default(error.InternalServerError(), req, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id, created_at, content, due_date, completed } = req.body;
    if (id !== req.params.id)
      return error.default(error.BadRequest('id is not matched'), req, res);

    if (!content && !completed)
      return error.default(error.BadRequest('content is required'), req, res);

    const task = new Task(id, created_at, content, dayjs(due_date), completed);
    const update_count = await taskTable.update(task);
    if (update_count > 0)
      res.status(200).json(task);
    else
      return error.default(error.NotFound(), req, res);
  } catch (err) {
    console.error(err);
    return error.default(error.InternalServerError(), req, res);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted_count = await taskTable.deleteById(id);
    if (deleted_count > 0)
      res.status(200).json({ id });
    else
      return error.default(error.NotFound(), req, res);
  } catch (err) {
    console.error(err);
    return error.default(error.InternalServerError(), req, res);
  }
});

export default router;
