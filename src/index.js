export const wrap = (handler) => async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context);
};
