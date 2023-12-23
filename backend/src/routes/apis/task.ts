import Express from 'express';
import { v4 as uuid } from 'uuid';
import TaskTable from '../../database/TaskTable';
import Task from '../../common/Task';
const router = Express.Router();
const taskTable = new TaskTable();

router.get('/', async (req, res) => {
  let tasks: Task[] = [];
  try {
    tasks = await taskTable.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error', code: 500 });
  }
});

router.post('/', async (req, res) => {
  try {
    let { id, content, due_date, completed } = req.body;

    if (!content)
      return res.status(400).send({ message: 'content is required', code: 400 });

    id = uuid();
    if (!due_date) due_date = new Date().toString();
    if (!completed) completed = false;

    const task = new Task(id, content, due_date, completed);
    await taskTable.append(task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error', code: 500 });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id, content, due_date, completed } = req.body;
    if (id !== req.params.id)
      return res.status(400).send({ message: 'id is not matched', code: 400 });

    if (!content && !due_date && !completed)
      return res.status(400).send({ message: 'content is required' });

    const task = new Task(id, content, due_date, completed);
    const update_count = await taskTable.update(task);
    if (update_count > 0)
      res.status(200).json(task);
    else
      res.status(404).send({ message: 'Not Found', code: 404 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error', code: 500 });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted_count = await taskTable.deleteById(id);
    if (deleted_count > 0)
      res.status(200).json({ id });
    else
      res.status(404).send({ message: 'Not Found', code: 404 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error', code: 500 });
  }
});

export default router;
