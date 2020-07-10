/**
 * Created by claudio on 2020-07-07
 */

const bitcoinLib = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');

/**
 * Verify a message's signature
 * @param {String|Buffer} addrOrPubKeyHash A bitcoin address or a public key hash
 * @param {String|Buffer} signature The message's signature (as returned by the sign() method
 *                                   of the 'bitcoinjs-message' module). If a string is provided
 *                                   instead of a Buffer, it is assumed to be base64 encoded
 * @param {String} message The original message
 * @param {String} [network] The name of the Bitcoin blockchain network for which the message was signed. One of:
 *                            'bitcoin', 'testnet', 'regtest'. If not specified or an invalid value is passed,
 *                            'bitcoin' network is assumed
 * @return {Boolean} Indicates whether message's signature has been successfully verified
 */
function verifyMessage(addrOrPubKeyHash, signature, message, network) {
    network = getNetworkByName(network);

    try {
        if (!Buffer.isBuffer(signature)) {
            signature = Buffer.from(signature, 'base64');
        }

        if (Buffer.isBuffer(addrOrPubKeyHash)) {
            // Assume that it is a public key hash. Determined type of address
            //  to be generated based on provided signature
            const flagByte = signature[0] - 27;

            if (flagByte >= 0 && flagByte <= 15) {
                const payment = !(flagByte & 0x08) ? bitcoinLib.payments.p2pkh :
                    ((flagByte & 0x04) ? bitcoinLib.payments.p2wpkh : bitcoinLib.payments.p2wsh);

                // Generate address from public key hash
                addrOrPubKeyHash = payment({network, hash: addrOrPubKeyHash}).address;
            }
        }

        // Verify message
        const msgPrefix = network ? network.messagePrefix : undefined;

        return bitcoinMessage.verify(message, addrOrPubKeyHash, signature, msgPrefix);
    }
    catch (err) {
        throw new Error('Error verifying message: ' + err.message);
    }
}

function getNetworkByName(name) {
    let network;

    switch(name) {
        case 'testnet':
            network = bitcoinLib.networks.testnet;
            break;

        case 'regtest':
            network = bitcoinLib.networks.regtest;
            break;

        case 'bitcoin':
        default:
            network = bitcoinLib.networks.bitcoin;
            break;
    }

    return network;
}

const modulesToExport = {
    verifyMessage
}

if (typeof window === 'object') {
    // Running on the browser. Exports Buffer
    modulesToExport.Buffer = Buffer;
}

module.exports = modulesToExport;
