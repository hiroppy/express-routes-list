#!/usr/bin/env node

'use strict';

const http = require('http');
const chalk = require('chalk');
const Table = require('cli-table');

const commands = process.argv.slice(2);

if (commands[0] === '-v' || commands[0] === '--version') {
  console.log(`Version: ${require('../package.json').version}`);
  process.exit(0);
}

if (commands[0] === '-h' || commands[0] === '--help') {
  process.exit(0);
}

const url = 'http://localhost:3000';

http.get(`${url}/__routes_list`, (res) => {
  let body = '';
  res.setEncoding('utf8');

  res.on('data', (chunk) => body += chunk);
  res.on('end', () => createTable(JSON.parse(body)));
}).on('error', (e) => console.error(e.message));

/**
 * create a table
 */
function createTable(res) {
  const table = new Table({
    chars: {
      'top'         : '',
      'top-mid'     : '',
      'top-left'    : '',
      'top-right'   : '',
      'bottom'      : '',
      'bottom-mid'  : '',
      'bottom-left' : '',
      'bottom-right': '',
      'left'        : '',
      'left-mid'    : '',
      'mid'         : '',
      'mid-mid'     : '',
      'right'       : '',
      'right-mid'   : '',
      'middle'      : ' '
    },
    style: {
      'padding-left' : 0,
      'padding-right': 0
    }
  });

  const arr = [];

  res.forEach((item) => {
    Object.keys(item.methods).forEach((method) => {
      if (item.methods[method]) {
        arr.push([method, item.path]);
      }
    });
  });

  table.push(
    [chalk.gray('method'), chalk.gray('path')],
    ...arr
  );

  console.log(table.toString());
}
