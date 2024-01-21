import dayjs from 'dayjs';
import Task from '../common/Task';
import TaskTable from '../database/TaskTable';

describe('TaskTable', () => {
    const table = new TaskTable();
    const tasks = [
        new Task('1', dayjs(), 'content1', dayjs().add(1, 'day'), true),
        new Task('2', dayjs(), 'content2', dayjs().add(1, 'day'), false),
    ];

    beforeEach(async () => {
        await table.deleteAll();
        tasks.forEach(async (task) => {
            await table.append(task);
        });
    });

    afterEach(async () => {
        await table.deleteAll();
    });

    afterAll(async () => {
        await table.deleteAll();
        await table.close();
    });

    test('Create a task.', async () => {
        const resTask = await table.findById(tasks[0].getId());
        expect(resTask).toEqual(tasks[0]);
    });

    test('Select all tasks.', async () => {
        const resTask = await table.findAll();
        expect(resTask).toEqual(tasks);
    });

    test('Update task content by id.', async () => {
        const updatedTask1 = new Task(
            tasks[0].getId(),
            tasks[0].getCreatedAt(),
            'updated content',
            tasks[0].getDueDate(),
            tasks[0].isCompleted()
        );
        await table.update(updatedTask1);
        const resUpdatedTask = await table.findById(updatedTask1.getId());
        expect(resUpdatedTask).toEqual(updatedTask1);
    });

    test('Delete task by id.', async () => {
        await table.deleteById(tasks[0].getId());
        const resTask = await table.findAll();
        expect(resTask).toEqual([tasks[1]]);
    });
});
