const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { FindAllUserI } = require('../domain/entities/dto/userInterface');
const userRepository = require('../domain/repository/userRepository');
const logger = require('../utils/logger');
const passportBasic = passport.use(new BasicStrategy(
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

module.exports = passportBasic;