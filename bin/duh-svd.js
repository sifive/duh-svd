#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const json5 = require('json5');
const onml = require('onml');
const fs = require('fs-extra');

const duh2svd = require('../lib/duh2svd.js');

// duh -> svd
const metaxml = '<?xml version="1.0" encoding="UTF-8"?>\n';

const duh2svdHandler = async argv => {
  if (argv.verbose) {
    console.log('duh2svd');
  }
  const duhStr = await fs.readFile(argv.duh, 'utf8');
  const duhObj = json5.parse(duhStr);
  const svdObj = duh2svd(duhObj);
  let svdStr;
  try {
    svdStr = metaxml + onml.stringify(svdObj, 2);
  } catch (err) {
    throw new Error(json5.stringify(svdObj, null, 2));
  }
  if (argv.svd) {
    await fs.outputFile(argv.svd, svdStr);
  } else {
    console.log(svdStr);
  }
};

yargs
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .command({
    command: 'duh2svd duh [svd]',
    desc: 'convert DUH file to SVD file',
    handler: duh2svdHandler,
    builder: yargs => {
      yargs
        .positional('duh', {
          type: 'string',
          desc: 'DUH file name'
        })
        .positional('svd', {
          type: 'string',
          desc: 'SVD file name'
        });
    }
  })
  .demandCommand()
  .help().argv;
