
exports.registerUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    age: {type: "integer"}
  },
  required: ["username", "age"],
  additionalProperties: false
};

exports.updateUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    age: {type: "integer"},
    userid: {type: "integer"}
  },
  required: ["username", "age", "userid"],
  additionalProperties: false
};

exports.deleteUserSchema = {
  type: "object",
  properties: {
    userid: {type: "integer"},
  },
  required: ["userid"],
  additionalProperties: false
};