module.exports.wrap = (handler) => (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  Promise.resolve(handler(event, context))
    .then((r) => callback(null, r))
    .catch((e) => callback(e));
};
