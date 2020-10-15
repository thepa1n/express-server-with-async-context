/**
 * EXAMPLE:
 *  {
      APP_CONTEXT: {
        name: 'APP',
        params: {
          TRACE_ID: 'TRACE_ID',
          USER_ID: 'USER_ID',
        }
      }
    }
 * Name Of Namespace for Context: 'APP'
 * 'APP' contains parameters: TRACE_ID and USER_ID
 */
module.exports = {
  APP_CONTEXT: {
    NAME: 'APP',
    PARAMS: {
      TRACE_ID: 'TRACE_ID',
      USER_ID: 'USER_ID',
      REQ_START_TIME: 'REQ_START_TIME'
    },
    HEADERS: {
      TRACE_ID: 'x-uuid',
      USER_ID: 'x-userid'
    }
  }
};
