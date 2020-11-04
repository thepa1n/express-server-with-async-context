const express = require('express');
const axios = require('axios');
const httpRequestContext = require('http-request-context');

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

app.use(httpRequestContext.middleware())
app.use(initAsyncContextMiddleware)

app.use(customLoggerMiddleware)


app.get('/', controllers.base);
app.get('/async', controllers.async);
app.get('/error', controllers.error);

const someRequest = async () => {
  return axios.post('http://localhost:7777/testTrace');
}

const newTestFunc = () => new Promise((resolve) => {

  setTimeout(() => {
    resolve({ status: true })
  }, 3000 )
})

// const
app.get('/test', async (req, res) => {
  try {
    // console.log('**********asyncLocalStorage********* ', AppContextService)
    
    const response = await someRequest()

    logger.info('Response from 7777: ', response.data)
    // console.log('**********asyncLocalStorage********* ', asyncLocalStorage.getStore())
    // console.log('**********asyncLocalStorage********* ', AppContextService.getSTORE())

    res.status(200).json(response.data)

    console.log('****************************<<OUT_COME>>****************************');

  } catch (error) {
    console.log(error);
    logger.error('***********ERRRRRRRRRROr**********', error)
  }
  // setTimeout(() => {
  //   res.status(200).json({
  //     status: true,
  //   })
  // }, 2000)
})

app.use(notFoundHandler)
app.use(customErrorLoggerMiddleware)
app.use(errorMiddleware)

app.listen(PORT, () => {
  logger.info(`Server started on ${PORT}...`);
})
