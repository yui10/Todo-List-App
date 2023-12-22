import Task from '../common/Task';
import TaskTable from '../database/TaskTable';

describe('TaskTable', () => {
    let table = new TaskTable();

    beforeEach(async () => {
        await table.deleteAll();
    });

    afterEach(async () => {
        await table.deleteAll();
    });


    test('Create a task.', async () => {
        let tasks = [
            new Task("1", "content1", new Date().toString(), true),
            new Task("2", "content2", new Date().toString(), false)
        ];
        for (let task of tasks)
            await table.append(task);

        let task_res = await table.findById(tasks[0].getId());
        expect(task_res).toEqual(tasks[0]);
    });


    test('Select all tasks.', async () => {
        let tasks = [
            new Task("1", "content1", new Date().toString(), true),
            new Task("2", "content2", new Date().toString(), false)
        ];
        for (let task of tasks)
            await table.append(task);

        let task_res = await table.findAll();
        expect(task_res).toEqual(tasks);
    });


    test('Update task content by id.', async () => {
        let tasks = [
            new Task("1", "content1", new Date().toString(), true),
            new Task("2", "content2", new Date().toString(), false)
        ];
        for (let task of tasks)
            await table.append(task);

        let updatedTask1 = new Task(tasks[0].getId(), "updated content", tasks[0].getDueDate(), tasks[0].isCompleted());
        await table.update(updatedTask1);
        let updatedTask_res = await table.findById(updatedTask1.getId());
        expect(updatedTask_res).toEqual(updatedTask1);
    });

    test('Delete task by id.', async () => {
        let tasks = [
            new Task("1", "content1", new Date().toString(), true),
            new Task("2", "content2", new Date().toString(), false)
        ];

        for (let task of tasks)
            await table.append(task);

        await table.deleteById(tasks[0].getId());
        let task_res = await table.findAll();
        expect(task_res).toEqual([tasks[1]]);
    });
});