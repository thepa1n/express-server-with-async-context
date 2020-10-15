const express = require('express');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

app.use(middlewares.initAsyncContextMiddleware)
app.use(middlewares.customLoggerMiddleware)
// app.use()

app.get('/', controllers.base);
app.get('/test', controllers.test);

app.use(middlewares.customErrorLoggerMiddleware)
app.use(middlewares.errorMiddleware)


const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Started on ${PORT}...`);
})
