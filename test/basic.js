'use strict';

const chai = require('chai');
const dut = require('../lib/');

const expect = chai.expect;

describe('basic', () => {

  it('one', done => {
    expect(dut.duh2svd).to.be.a('function');
    done();
  });

});

/* eslint-env mocha */
