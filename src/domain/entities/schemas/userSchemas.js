
exports.registerUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    age: {type: "integer"},
    email: {
      type: "string",
      transform: ["trim"],
      minLength: 8,
      maxLength: 70,
      format: "email",
    },
    password: {
      type: "string",
      regexp: "/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)*.*$/i",
    },
  },
  required: ["username", "age", "password", "email"],
  additionalProperties: false
};

exports.updateUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    age: {type: "integer"},
    userid: {type: "integer"},
    email: {
      type: "string",
      transform: ["trim"],
      minLength: 8,
      maxLength: 70,
      format: "email",
    },
  },
  required: ["username", "age", "userid","email"],
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

exports.authUserSchema = {
  type: "object",
  properties: {
    username: {type: "string"},
    age: {type: "integer"},
    userid: {type: "integer"},
    email: {
      type: "string",
      transform: ["trim"],
      minLength: 8,
      maxLength: 70,
      format: "email",
    },
  },
  required: ["username", "age", "userid","email"],
  additionalProperties: false
};