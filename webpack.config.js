/**
 * Created by claudio on 2020-07-07
 */

const path = require('path');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'umd'),
        filename: 'btc-message-verifier.js',
        library: 'btcMsgVerifier',
        libraryTarget: 'umd'
    }
};
