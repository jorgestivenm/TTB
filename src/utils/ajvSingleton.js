const addFormats = require('ajv-formats');
const AjvValidation = require('ajv');

function createAjvInstace () {
  const ajv = new AjvValidation();
  require("ajv-keywords")(ajv);
  addFormats(ajv,["email","time"]);
  return ajv;
};

exports.getAjvInstace = () => {
  const ajv = createAjvInstace();
  return ajv;
};