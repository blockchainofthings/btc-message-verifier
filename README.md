# Bitcoin Message Verifier

A JavaScript library used to verify a message that had been signed using Bitcoin's approach.

## Rationale

Bitcoin's client reference implementation, Bitcoin Core, provides an RPC method to sign a message with a bitcoin
 address (`signmessage`) and another to verify the signed message (`verifymessage`). However, as of this writing,
 Bitcoin Core is not able to sign and verify messages using segregated witness (bech32) addresses. Also, it is not
 possible to verify a signed message using a public key hash instead of a bitcoin address.

This library was put together to overcome these two limitations.

## Implementation

This library uses [`bitcoinjs-message`](https://github.com/bitcoinjs/bitcoinjs-message) module's approach to sign
 messages with bech32 addresses where a bit (0x08) in the signature's first byte is used to flag that a bech32 address
 was used to sign the message.

## Installation

On Node.js:

```shell
npm install btc-message-verifier
```

On the browser:

```html
<script src="https://unpkg.com/btc-message-verifier"></script>
```

### Browser compatibility

The Bitcoin Message Verifier library is compatible with modern web browsers.

It has been tested on the following web browsers:

- Safari ver. 13.1 (on macOS Catalina 10.15)
- Google Chrome ver. 83.0 64 bits (on macOS Catalina 10.15, Windows 10)
- Google Chrome ver. 83.0 32 bits (on Windows 8.1)
- Firefox ver. 78.0 64-bits (on macOS Catalina 10.15)
- Microsoft Edge ver. 83.0 64 bits (on macOS Catalina 10.15, Windows 8.1, Windows 10)

> **Note**: Internet Explorer is **not** supported.

## Usage

Call the library's single method `verifyMessage()` to verify a signed message. A `boolean` value is then returned
 indicating whether the message is valid or not.

On Node.js:

```javascript
const btcMsgVerifier = require('btc-msg-verifier');

const result = btcMsgVerifier.verifyMessage(...);
```

On the browser:

```html
<script>
const result = btcMsgVerifier.verifyMessage(...);
</script>
```

Input parameters:

- **addrOrPubKeyHash** \[String|Buffer\] - The bitcoin address or public key hash that was originally used to sign the
 message. If a buffer is passed, it is assumed to be a public key hash. Otherwise, it is assumed to be a bitcoin address.
- **signature** \[String|Buffer\] - The message's signature. If a string is passed, it is assumed to be base64 encoded.
- **message** \[String\] - The original message.
- **network** \[String\] - (optional, default: <b>*'bitcoin'*</b>) The name of the Bitcoin blockchain network for which
 the message was signed. Valid values:
  - *'bitcoin'*
  - *'regtest'*
  - *'testnet'*

## Examples

### Verify message signed with a legacy bitcoin address

On Node.js:

```javascript
try {
  const result = btcMsgVerifier.verifyMessage(
    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
```

On the browser:

```html
<script>
try {
  const result = btcMsgVerifier.verifyMessage(
    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
</script>
```

### Verify message signed with a bech32 address

On Node.js:

```javascript
try {
  const result = btcMsgVerifier.verifyMessage(
    'bcrt1qwfwu4tawzwdh233qlqwknk2r3quefyalvpwqyg',
    'KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
```

On the browser:

```html
<script>
try {
  const result = btcMsgVerifier.verifyMessage(
    'bcrt1qwfwu4tawzwdh233qlqwknk2r3quefyalvpwqyg',
    'KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
</script>
```

### Verify message passing a public key hash

On Node.js:

```javascript
try {
  const result = btcMsgVerifier.verifyMessage(
    Buffer.from('543fc89cd1e5bda2ba3c82f4b48e3a82694498be', 'hex'),
    'IEk3JJnp8iKhAgp50hWCE7TCNciaDdrb8YNXWvqZzIUgcLvESYJO/ZFigJ726vpQ12tY6SDGg92aouzUMXKAgUE=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
```

On the browser:

```html
<script>
try {
  const result = btcMsgVerifier.verifyMessage(
    btcMsgVerifier.Buffer.from('543fc89cd1e5bda2ba3c82f4b48e3a82694498be', 'hex'),
    'IEk3JJnp8iKhAgp50hWCE7TCNciaDdrb8YNXWvqZzIUgcLvESYJO/ZFigJ726vpQ12tY6SDGg92aouzUMXKAgUE=',
    'Text to sign'
  );

  if (result) {
    console.log('Message successfully verified');
  }
  else {
    console.log('Message could not be verified');
  }
}
catch (err) {
  console.error(err);
}
</script>
```

## License

This JavaScript library is released under the [MIT License](LICENSE). Feel free to fork, and modify!

Copyright © 2020, Blockchain of Things Inc.
