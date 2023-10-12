const restify = require("restify");
const errs = require("restify-errors");
const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const Database = require("./database");
const db = new Database();

set_header_to_cache = function (res, etag, lastmod) {
  res.header("ETag", etag);
  res.header("Last-Modified", lastmod);
  res.setHeader("Content-Type", "application/json");
};

get_error_rq = function (req) {
  let err = null;
  if (req.params.resource && !db.data.hasOwnProperty(req.params.resource)) {
    err = new errs.NotFoundError(`Resource /${req.params.resource} not found!`);
  }
  if (req.params.id) {
    let item = db.get_resource_by_id(req.params.resource, req.params.id);
    if (!item)
      err = new errs.NotFoundError(
        `Resource /${req.params.resource}/${req.params.id} not found!`
      );
  }
  return err;
};

server.use(function (req, res, next) {
  let err = get_error_rq(req);
  if (err) return next(err);

  let etag = db.get_etag_by_resource(req, 0);
  let lastmod = db.get_etag_by_resource(req, 1);
  console.log("ETag req: ", req.header("ETag"), "  ETag res: ", etag);
  // restify.plugins.conditionalRequest();
  set_header_to_cache(res, etag, lastmod);
  if (etag == req.header("ETag")) {
    const error_msg = `Resource /${req.params.resource} not modified!`;
    return res.send(304, new Error(error_msg));
  }
  return next();
});

server.get("/", (req, res, next) => {
  res.send({ mensagem: "Welcome MyRestify API TP1" });
  next();
});

server.get("/:resource", (req, res, next) => {
  if (req.params.resource in db.data) {
    res.end(JSON.stringify(db.data[req.params.resource]));
  }
});

server.get("/:resource/:id", (req, res, next) => {
  let item = db.get_resource_by_id(req.params.resource, req.params.id);
  if (item) {
    res.end(JSON.stringify(item));
    return next();
  }
});

// POST - Insert Resource
server.post("/:resource", (req, res, next) => {
  console.log("form:: ", req.body, typeof req.body);
  let item = db.insert(req.params.resource, req.body);
  res.end(JSON.stringify(item));
  next();
});

server.listen(3000, () => {
  console.log("Done! Waiting for requests..");
});
