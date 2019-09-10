module.exports.wrap = (handler) => (event, context, callback) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  Promise.resolve(handler(event, context))
    .then((r) => callback(null, r))
    .catch((e) => callback(e));
};
