const addFormats = require('ajv-formats');
const AjvValidation = require('ajv');

/**
 * @private
 * @function Create/AJVinstance 
 * @returns {Object} ajv
 */
function createAjvInstace () {
  const ajv = new AjvValidation();
  require("ajv-keywords")(ajv);
  addFormats(ajv,["email","time"]);
  return ajv;
};

/**
 * Exporting get AJV module to be used to validate objects
 * @module getAjvInstace
 * @returns AJV instace
 */
exports.getAjvInstace = () => {
  const ajv = createAjvInstace();
  return ajv;
};