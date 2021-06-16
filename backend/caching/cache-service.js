const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.log("no get");
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(key, "key");
    res.send(cachedResponse);
  } else {
    console.log("missed");
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
