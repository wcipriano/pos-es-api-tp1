const data = require("./db.json");

class Database {
  constructor() {
    // Constructor
    this.data_version = {};
    this.data = data;
    this.set_data_version();
  }
  set_data_version = function () {
    for (const key in this.data) {
      this.data_version[key] = new Array(1, new Date(Date.now()).toISOString());
    }
    console.log(this.data_version);
  };
  inc_data_version = function (resource) {
    this.data_version[resource][0] = this.data_version[resource][0] + 1;
    this.data_version[resource][1] = new Array(
      1,
      new Date(Date.now()).toISOString()
    );
  };
  get_etag_by_resource = function (req, idx) {
    return req.params.resource in this.data_version
      ? `${req.params.resource}_${this.data_version[req.params.resource][idx]}`
      : "";
  };
  get_resource_by_id = function (resource, id) {
    let res = null;
    if (resource in this.data) {
      for (let i = 0; i < this.data[resource].length; i++) {
        const item = this.data[resource][i];
        if (item.id == id) {
          res = item;
          break;
        }
      }
    }
    return res;
  };

  insert = function (resource, form) {
    let id = this.data[resource].length + 1;
    form["id"] = id;
    this.data[resource].push(form);
    this.inc_data_version(resource);
    return form;
  };
}

module.exports = Database;
