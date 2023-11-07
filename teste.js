const restify = require("restify");
const server = restify.createServer();

server.use(restify.plugins.conditionalRequest());

server.use(function setETag(req, res, next) {
  res.header("ETag", "myETag");
  res.header("Last-Modified", "Thu, 12 Oct 2023 14:49:07 GMT");
  next();
});

server.use(restify.plugins.conditionalRequest());

server.get("/teste/:name", (req, res, next) => {
  res.send("teste " + req.params.name);
  next();
});

server.listen(3000, () => {
  console.log("Done! Waiting for requests..");
});
