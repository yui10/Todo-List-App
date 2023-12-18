import express = require('express')
import * as usersRouter from "./routes/users";
import * as apiRouter from "./routes/apis/task";

const app = express();
app.use(express.json());
// CORSの設定
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/users', usersRouter.index);
app.use('/api/task', apiRouter.default);


export default app;
