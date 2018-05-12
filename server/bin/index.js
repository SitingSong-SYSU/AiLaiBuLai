#!/usr/bin/env node

import app from '../app';
import koa from 'koa';
import http from 'http';
import process from 'process';

import { CONF } from '../config';
import { logger } from '../utils';
import { initDatabase } from '../models/init';

initDatabase();

const port = CONF.port;

var server = http.createServer(app.callback());
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
}

// // const app = new koa();

// // app.use(ctx => {
// //   ctx.body = 'Hello Koa';
// // });

// // app.listen(port);
// // console.log("???")