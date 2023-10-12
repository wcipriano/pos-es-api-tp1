// Lib requirements
const restify = require("restify");
const errs = require("restify-errors");
const server = restify.createServer();
require("dotenv").config();

// Lib restify plugins
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());

// Consts
const Database = require("./database");
const db = new Database();
const path = "/api";

// Set headers
set_header_to_cache = function (res, etag, lastmod) {
  res.header("ETag", etag);
  res.header("Last-Modified", lastmod);
  res.setHeader("Content-Type", "application/json");
};

// Request error validation
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

// Routes GET
server.get(`${path}/`, (req, res, next) => {
  res.send({ mensagem: "Welcome Restify AWS API TP1. Have fun!!!" });
});
server.get(`${path}/ping`, (req, res, next) => {
  res.send("I'm here, don't worry  ; )   Restify AWS API TP1");
});

server.get(`${path}/:resource`, (req, res, next) => {
  if (req.params.resource in db.data) {
    res.end(JSON.stringify(db.data[req.params.resource]));
  }
});

server.get(`${path}/:resource/:id`, (req, res, next) => {
  let item = db.get_resource_by_id(req.params.resource, req.params.id);
  if (item) {
    res.end(JSON.stringify(item));
    return next();
  }
});

// Route POST - Insert Resource
server.post(`${path}/:resource`, (req, res, next) => {
  let item = db.insert(req.params.resource, req.body);
  res.send(201, item);
});

// Route PATCH - Update Resource
server.patch(`${path}/:resource/:id`, (req, res, next) => {
  let item = db.update(req.params.resource, req.body, req.params.id);
  if (item) {
    res.send(200, item);
  } else {
    let err = new errs.NotFoundError(
      `Resource /${req.params.resource}/${req.params.id} not found!`
    );
    res.send(err);
  }
});

// Route DELETE - Remove Resource
server.del(`${path}/:resource/:id`, (req, res, next) => {
  let item = db.delete(req.params.resource, req.body, req.params.id);
  if (item) {
    res.send(200);
  } else {
    let err = new errs.BadRequestError("Item not found");
    res.send(err);
  }
});

// Server
server.listen(process.env.PORT, () => {
  console.log("Done! Waiting for requests..");
});
