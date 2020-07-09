/**
 * Created by claudio on 2020-07-08
 */

const btcMsgVerifier = require('../index');
const expect = require('chai').expect;

const testSuite = require('./suite/MessageVerifierSuite');

testSuite(btcMsgVerifier, expect);
