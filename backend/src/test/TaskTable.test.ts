import Task from '../common/Task';
import TaskTable from '../database/TaskTable';
import dayjs from 'dayjs';

describe('TaskTable', () => {
    let table = new TaskTable();
    const tasks = [
        new Task("1", dayjs(), "content1", dayjs().add(1, "day"), true),
        new Task("2", dayjs(), "content2", dayjs().add(1, "day"), false)
    ];

    beforeEach(async () => {
        await table.deleteAll();
        for (let task of tasks)
            await table.append(task);
    });

    afterEach(async () => {
        await table.deleteAll();
    });

    afterAll(async () => {
        await table.deleteAll();
        await table.close();
    });


    test('Create a task.', async () => {
        let task_res = await table.findById(tasks[0].getId());
        expect(task_res).toEqual(tasks[0]);
    });


    test('Select all tasks.', async () => {
        let task_res = await table.findAll();
        expect(task_res).toEqual(tasks);
    });


    test('Update task content by id.', async () => {
        let updatedTask1 = new Task(tasks[0].getId(), tasks[0].getCreatedAt(), "updated content", tasks[0].getDueDate(), tasks[0].isCompleted());
        await table.update(updatedTask1);
        let updatedTask_res = await table.findById(updatedTask1.getId());
        expect(updatedTask_res).toEqual(updatedTask1);
    });

    test('Delete task by id.', async () => {
        await table.deleteById(tasks[0].getId());
        let task_res = await table.findAll();
        expect(task_res).toEqual([tasks[1]]);
    });
});