import React from 'react';
import Modal from 'react-modal';
import { Button, Box, Container, Stack, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import Task from '../common/Task';

type Props = {
    tasks: Task;
    EnableEdit: boolean;
    isOpenModal: boolean;
    setEditTask: (task: Task) => void;
    setEnableEdit: (enableEdit: boolean) => void;
    setIsOpenModal: (isOpenModal: boolean) => void;
    CreateTask: (task: Task) => void;
    UpdateTask: (task: Task) => void;
};

Modal.setAppElement('#root');

function AddTask(props: Props) {
    const taskText = React.useRef<HTMLInputElement>(null);
    const dueDate = React.useRef<HTMLInputElement>(null);
    const { tasks, EnableEdit, isOpenModal, setEditTask, setEnableEdit, setIsOpenModal, CreateTask, UpdateTask } = props;

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setEditTask(new Task('', dayjs(), '', '', false));
        setEnableEdit(false);
        setIsOpenModal(false);
    }

    const handleAppend = () => {
        if (taskText.current === null) return;
        if (taskText.current.value === '') return;
        const day = dayjs(dueDate.current?.value).utc();
        const id = tasks.getId() ?? '0';
        const task = new Task(id, dayjs(), taskText.current.value, day.format('YYYY-MM-DDThh:mmZ'), false);
        if (EnableEdit) UpdateTask(task);
        else CreateTask(task);
        taskText.current.value = '';
        closeModal();
    };

    return (
        <div>
            <Button variant="contained" onClick={openModal} endIcon={<AddIcon />}>
                Add Task
            </Button>
            <Modal
                isOpen={isOpenModal}
                onAfterOpen={openModal}
                onAfterClose={closeModal}
                onRequestClose={closeModal}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CloseIcon onClick={closeModal} />
                </Box>
                <Container maxWidth="sm">
                    <Stack spacing={4}>
                        <p>タスク名</p>
                        <TextField
                            id="standard-basic"
                            className="inputTask"
                            label="Task"
                            variant="standard"
                            inputRef={taskText}
                            defaultValue={tasks.getContent()}
                        />

                        <p>期限</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                            <DateTimePicker
                                label="Due date and time"
                                minDateTime={dayjs('2000-01-01T00:00')}
                                maxDateTime={dayjs('2099-12-31T23:59')}
                                ampm={false}
                                inputRef={dueDate}
                                defaultValue={tasks.getDueDateDayjs()}
                            />
                        </LocalizationProvider>
                        {EnableEdit ? (
                            <Button variant="contained" onClick={handleAppend} endIcon={<EditIcon />}>
                                Edit Task
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleAppend} endIcon={<AddIcon />}>
                                Add Task
                            </Button>
                        )}
                        <Button variant="outlined" onClick={closeModal} endIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                    </Stack>
                </Container>
            </Modal>
        </div>
    );
}

export default AddTask;
