'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('auth error'); }

  let basic = req.headers.authorization;
  // let decoded = base64.decode(basic.split(' ').pop());
  let [username, pass] = base64.decode(basic.split(' ').pop()).split(':');
  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};
