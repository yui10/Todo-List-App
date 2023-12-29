import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default class Task {
    private id: string;
    private created_at: dayjs.Dayjs;
    private content: string;
    private due_date: string;
    private completed: boolean;

    constructor(id: string, created_at: dayjs.Dayjs, content: string, due_date: string, completed: boolean = false) {
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

    public getDueDateLocale(): string {
        let due_date = dayjs(this.due_date);
        if (due_date.isValid())
            return dayjs(this.due_date).tz().format('YYYY-MM-DDTHH:mm');
        else
            return '';
    }

    public getDueDateDayjs(): dayjs.Dayjs | null {
        let due_date = dayjs(this.due_date);
        if (due_date.isValid())
            return due_date;
        else
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
