import express = require('express')
import * as usersRouter from "./routes/users";
import * as apiRouter from "./routes/apis/task";
import errorHandler, { NotFound } from './common/errorException';
import cors from 'cors';

const app = express();
app.use(express.json());
// CORSの設定
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use('/users', usersRouter.index);
app.use('/api/task', apiRouter.default);

app.all('/', (req, res, next) => {
    next(errorHandler(NotFound("404 Not Found"), req, res));
});

app.all('*', (req, res, next) => {
    next(errorHandler(NotFound("404 Not Found"), req, res));
});

export default app;
