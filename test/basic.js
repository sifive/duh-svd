'use strict';

const chai = require('chai');
const duh2svd = require('../lib/duh2svd.js');

const expect = chai.expect;

describe('basic', () => {

  it('one', done => {
    expect(duh2svd).to.be.a('function');
    done();
  });

});

/* eslint-env mocha */
