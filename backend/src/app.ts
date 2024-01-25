import express = require('express');
import cors from 'cors';
import * as usersRouter from './routes/users';
import * as apiRouter from './routes/apis/task';
import errorHandler, { NotFound } from './common/errorException';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.TRUSTED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use('/users', usersRouter.index);
app.use('/api/task', apiRouter.default);

app.all('/', (req, res, next) => {
    next(errorHandler(NotFound('404 Not Found'), req, res));
});

app.all('*', (req, res, next) => {
    next(errorHandler(NotFound('404 Not Found'), req, res));
});

export default app;
