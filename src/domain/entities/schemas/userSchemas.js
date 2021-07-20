
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

exports.UserIdSchema = {
  type: "object",
  properties: {
    userid: {type: "string"},
  },
  required: ["userid"],
  additionalProperties: false
};