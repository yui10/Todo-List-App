import express = require('express')
import * as usersRouter from "./routes/users";
import * as indexRouter from "./routes/index";

const app = express();
app.use('/', indexRouter.index);
app.use('/users', usersRouter.index);

export default app;
