import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default class Task {
    public static readonly TimeFormat = 'YYYY-MM-DDTHH:mm';

    public static readonly TimeFormatSeconds = 'YYYY-MM-DDTHH:mm:ss';

    private id: string;

    private created_at: dayjs.Dayjs;

    private content: string;

    private due_date: string;

    private completed: boolean;

    constructor(id: string, created_at: dayjs.Dayjs, content: string, due_date: string, completed = false) {
        this.id = id;
        this.created_at = created_at;
        this.content = content;
        this.due_date = due_date;
        this.completed = completed;
    }

    public getId(): string {
        return this.id;
    }

    public getCreatedAt(): dayjs.Dayjs {
        return this.created_at;
    }

    public getContent(): string {
        return this.content;
    }

    public getDueDate(): string {
        return this.due_date;
    }

    public getDueDateDayjs(): dayjs.Dayjs | null {
        const dueDate = dayjs(this.due_date);
        if (dueDate.isValid())
            return dueDate;
        return null;
    }

    /**
     * task is completed if status is COMPLETED and completed is true
     * @returns true if the task is completed, false otherwise
     */
    public isCompleted(): boolean {
        return this.completed;
    }
}
