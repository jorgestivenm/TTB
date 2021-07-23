/**Exporting the register user shcema */
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

/**Exporting the update user shcema */
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

/**Exporting the param userid shcema */
exports.UserIdSchema = {
  type: "object",
  properties: {
    userid: {type: "string"},
  },
  required: ["userid"],
  additionalProperties: false
};

/**Exporting the authentication user shcema */
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