'use strict';

const pkg = require('../package.json');
const duh2svd = require('./duh2svd.js');

exports.version = pkg.version;
exports.duh2svd = duh2svd;
