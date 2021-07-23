const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { FindAllUserI } = require('../domain/entities/dto/userInterface');
const userRepository = require('../domain/repository/userRepository');
const logger = require('../utils/logger');

/**
 * Midleware Object to perform a basic valdation to the request sended to the API
 * @name passportBasic
 */
const passportBasic = passport.use(new BasicStrategy(
  /**
   * @async
   * @function authStrategy
   * @param {string} username(email) 
   * @param {string} password 
   * @returns {Promise|null} Promise object represents the user
   */
  async function (username, password, done) {
    // logger.info(`${username}:${password}`)
    const params = FindAllUserI();
    const answ = await userRepository.basicAuth(params, username, password);
    if (!answ[0]) {
      if (answ[1] === undefined) return done(null, false)
      return done(answ[1])
    }
    if (answ[1] === undefined ) return done(null, false)
    return done(null, answ[1]);
  }
));
/**
 * Exporting the passportbasic midleware to be used in the exposed API methods
 * @module passportBasic
 */
module.exports = passportBasic;