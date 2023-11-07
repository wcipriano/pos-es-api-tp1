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
  };
  inc_data_version = function (resource) {
    this.data_version[resource][0] = this.data_version[resource][0] + 1;
    this.data_version[resource][1] = new Array(
      1,
      new Date(Date.now()).toISOString()
    );
  };
  get_etag_by_resource = function (req, idx) {
    const dt = new Date().toISOString().split("T")[0];
    return req.params.resource in this.data_version
      ? `${req.params.resource}_${dt}_${
          this.data_version[req.params.resource][idx]
        }`
      : "";
  };
  get_resource_by_id = function (resource, id, ret_obj) {
    ret_obj = ret_obj == undefined ? true : false;
    let res = null;
    if (resource in this.data) {
      for (let i = 0; i < this.data[resource].length; i++) {
        const item = this.data[resource][i];
        if (item.id == id) {
          res = ret_obj == true ? item : i;
          break;
        }
      }
    }
    return res;
  };

  insert = function (resource, form) {
    let id = this.data[resource][this.data[resource].length - 1].id + 1;
    form["id"] = id;
    this.data[resource].push(form);
    this.inc_data_version(resource);
    return form;
  };

  update = function (resource, form, id) {
    let obj = this.get_resource_by_id(resource, id);
    if (obj) {
      for (let field in form) {
        if (field in obj) {
          obj[field] = form[field];
        }
      }
      this.inc_data_version(resource);
    }
    return obj;
  };

  delete = function (resource, form, id) {
    let obj_idx = this.get_resource_by_id(resource, id, false);
    console.log("\n\nthis.data[resource]:: ", this.data[resource]);
    if (obj_idx) {
      this.data[resource].splice(obj_idx, 1);
      this.inc_data_version(resource);
    }
    console.log("this.data[resource]:: ", this.data[resource]);
    return obj_idx;
  };
}

module.exports = Database;
