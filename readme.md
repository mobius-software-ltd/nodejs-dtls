# @mobius-software-ltd/nodejs-dtls

[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/emersion/stability-badges#experimental)
[![Build Status](https://travis-ci.org/nodertc/dtls.svg?branch=master)](https://travis-ci.org/nodertc/dtls)
[![npm](https://img.shields.io/npm/v/@nodertc/dtls.svg)](https://www.npmjs.com/package/@nodertc/dtls)
[![node](https://img.shields.io/node/v/@nodertc/dtls.svg)](https://www.npmjs.com/package/@nodertc/dtls)
[![license](https://img.shields.io/npm/l/@nodertc/dtls.svg)](https://www.npmjs.com/package/@nodertc/dtls)
[![downloads](https://img.shields.io/npm/dm/@nodertc/dtls.svg)](https://www.npmjs.com/package/@nodertc/dtls)
[![telegram](https://img.shields.io/badge/telegram-nodertc-brightgreen.svg)](https://t.me/nodertc)

Secure UDP communications using Datagram Transport Layer Security protocol version 1.2 in **pure js**. Follow [RFC6347](https://tools.ietf.org/html/rfc6347), [RFC7627](https://tools.ietf.org/html/rfc7627).

[![asciicast](fixtures/terminalizer/render1533622791504.gif)](https://asciinema.org/a/195096)

### Features

* no native dependecies!
* modern secure ciphers - AEAD with ECDHE
* support set / get MTU
* in / out handshake fragmentation
* handshake retransmission
* merge outgoing handshakes

### Usage

```
npm i nodejs-dtls
```

```js
const dtls = require('nodejs-dtls');

const socket = dtls.connect({
  remotePort: 4444,
  remoteAddress: '127.0.0.1',
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
```

### Suppored ciphers:

* TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
* TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
* TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
* TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
* TLS_RSA_WITH_AES_128_GCM_SHA256
* TLS_RSA_WITH_AES_256_GCM_SHA384

### API

* `dtls.connect(options: Options [, callback: function]) : Socket`

Creates an esteblished connection to remote dtls server. A `connect()` function also accept all options for [`unicast.createSocket()`](https://www.npmjs.com/package/unicast) or [`dgram.createSocket()`](https://nodejs.org/dist/latest-v8.x/docs/api/dgram.html#dgram_dgram_createsocket_options_callback). If `options.socket` is provided, these options will be ignored.

The `callback` function, if specified, will be added as a listener for the 'connect' event.

* `options.socket`

A [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) in a common case. It is also [unicast](https://www.npmjs.com/package/unicast) or [dgram](https://nodejs.org/dist/latest-v8.x/docs/api/dgram.html) socket instance. Used if you want a low level control of your connection.

* `options.extendedMasterSecret: bool, [default=true]`

This option enable the use [Extended Master Secret](https://tools.ietf.org/html/rfc7627) extension. Enabled by default.

* `options.checkServerIdentity: function(certificate): bool`

Optional certificate verify function.

* `options.certificate: Buffer`

PEM-encoded client certificate, optional. Supports RSASSA-PKCS1-v1_5 and ECDSA certificates.

* `options.certificatePrivateKey: Buffer`

PEM-encoded private key for client certificate.

* `options.maxHandshakeRetransmissions: number`

The number of retransmissions during on handshake stage.

* `options.alpn: string | string[]`

The list of the supported ALPN protocols.

* `class Socket`

A `Socket` is also a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex), so it can be both readable and writable, and it is also a [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

* `Socket.setMTU(mtu: number): void`

Set MTU (minimal transfer unit) for this socket, 1420 bytes maximal.

* `Socket.getMTU(): number`

Return MTU (minimal transfer unit) for this socket, 1200 bytes by default.

* `Socket.setTimeout(timeout: number[, callback: function()])`

Sets the socket to timeout after timeout milliseconds of inactivity on the socket. By default `dtls.Socket` do not have a timeout.

The optional callback parameter will be added as a one-time listener for the 'timeout' event.

* `Socket.close(): void`

Close socket, stop listening for socket. Do not emit `data` events anymore.

* `Socket.alpnProtocol: string`

Get a string that contains the selected ALPN protocol.

* `Event: connect`

The 'connect' event is emitted after the handshaking process for a new connection has successfully completed.

* `Event: timeout`

Emitted if the socket times out from inactivity. This is only to notify that the socket has been idle.

### How to debug?

Start openssl dtls server:

```sh
npm run openssl-server
```

or start GnuTLS dtls server (more debug messages):

```sh
# tested in Ubuntu 16, use docker if you are Windows / MacOS user.
npm run gnutls-server
```

Start default client:

```sh
npm start
```

## License

MIT, 2018 &copy; Dmitriy Tsvettsikh
