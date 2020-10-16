const express = require('express');

const controllers = require('./controllers');
const middlewares = require('./middlewares');
const { PORT } = require('./config');

const app = express();

app.use(middlewares.initAsyncContextMiddleware)
app.use(middlewares.customLoggerMiddleware)

app.get('/', controllers.base);
app.get('/async', controllers.async);
app.get('/error', controllers.error);

app.use(middlewares.notFoundHandler)
app.use(middlewares.customErrorLoggerMiddleware)
app.use(middlewares.errorMiddleware)

app.listen(PORT, () => {
  console.log(`Started on ${PORT}...`);
})
