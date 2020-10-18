const express = require('express');

const controllers = require('./controllers');
const {
  customErrorLoggerMiddleware,
  customLoggerMiddleware,
  errorMiddleware,
  initAsyncContextMiddleware,
  notFoundHandler,
} = require('./middlewares');
const { PORT } = require('./config');
const { logger } = require('./utils/loggerService');

const app = express();

app.use(initAsyncContextMiddleware)
app.use(customLoggerMiddleware)

app.get('/', controllers.base);
app.get('/async', controllers.async);
app.get('/error', controllers.error);

app.use(notFoundHandler)
app.use(customErrorLoggerMiddleware)
app.use(errorMiddleware)

app.listen(PORT, () => {
  logger.info(`Server started on ${PORT}...`);
})
