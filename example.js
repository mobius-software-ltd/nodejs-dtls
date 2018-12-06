'use strict';

Error.stackTraceLimit = Infinity;
const dgram = require('dgram');
const fs = require('fs');
const path = require('path');
const dtls = require('.');

const udp = dgram.createSocket('udp4');

const socket = dtls.connect({
  socket: udp,
  remotePort: 5555,
  remoteAddress: '127.0.0.1',
  certificate: fs.readFileSync(
    path.resolve(__dirname, 'fixtures/cert.pem')
  ),
  certificatePrivateKey: fs.readFileSync(
    path.resolve(__dirname, 'fixtures/key.pem')
  ),
  maxHandshakeRetransmissions: 4,
  alpn: 'http/1.1',
});

socket.on('error', err => {
  console.error(err);
});

socket.on('data', data => {
  console.log('got message "%s"', data.toString('ascii'));
  socket.close();
});

socket.once('connect', () => {
  socket.write('Hello from Node.js!');
});

socket.once('timeout', () => {
  console.log('got timeout');
});

socket.setTimeout(5e3);
