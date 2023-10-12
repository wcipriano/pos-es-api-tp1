const restify = require("restify");
const errs = require("restify-errors");
const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
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

/* 
Plugin that will compare an already set ETag header with the client's header
  IF client send Header "If-None-Match" and it's the same of "ETag" Header:
    Server return 304 (Not Modified)
  ELSE:
    Server return 200
*/
server.use(restify.plugins.conditionalRequest());

server.use(function (req, res, next) {
  //Check RQ Erros
  let err = get_error_rq(req);
  if (err) return next(err);
  //Set Headers
  let etag = db.get_etag_by_resource(req, 0);
  let lastmod = db.get_etag_by_resource(req, 1);
  set_header_to_cache(res, etag, lastmod);
  return next();
});

server.use(restify.plugins.conditionalRequest());

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
