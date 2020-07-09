/**
 * Created by claudio on 2020-07-08
 */

(function () {
    const testSuite = function suite(btcMsgVerifier, expect) {
        const oBuffer = typeof Buffer !== 'undefined' ? Buffer : btcMsgVerifier.Buffer;

        describe('Message Verifier', function () {
            const network = 'regtest';

            it('should successfully verify message with legacy bitcoin address and signature as base64 string', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
                    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with legacy bitcoin address and signature as Buffer', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
                    oBuffer.from('H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=', 'base64'),
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with bech32 address and signature as base64 string', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'bcrt1qwfwu4tawzwdh233qlqwknk2r3quefyalvpwqyg',
                    'KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=',
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with bech32 address and signature as Buffer', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'bcrt1qwfwu4tawzwdh233qlqwknk2r3quefyalvpwqyg',
                    oBuffer.from('KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=', 'base64'),
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with public key hash and signature as base64 string', function () {
                const result = btcMsgVerifier.verifyMessage(
                    oBuffer.from('543fc89cd1e5bda2ba3c82f4b48e3a82694498be', 'hex'),
                    'IEk3JJnp8iKhAgp50hWCE7TCNciaDdrb8YNXWvqZzIUgcLvESYJO/ZFigJ726vpQ12tY6SDGg92aouzUMXKAgUE=',
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with public key hash and signature as Buffer', function () {
                const result = btcMsgVerifier.verifyMessage(
                    oBuffer.from('543fc89cd1e5bda2ba3c82f4b48e3a82694498be', 'hex'),
                    oBuffer.from('IEk3JJnp8iKhAgp50hWCE7TCNciaDdrb8YNXWvqZzIUgcLvESYJO/ZFigJ726vpQ12tY6SDGg92aouzUMXKAgUE=', 'base64'),
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with public key hash (derived from a segwit address) and signature as base64 string', function () {
                const result = btcMsgVerifier.verifyMessage(
                    oBuffer.from('725dcaafae139b754620f81d69d94388399493bf', 'hex'),
                    'KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=',
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message with public key hash (derived from a segwit address) and signature as Buffer', function () {
                const result = btcMsgVerifier.verifyMessage(
                    oBuffer.from('725dcaafae139b754620f81d69d94388399493bf', 'hex'),
                    oBuffer.from('KBbtz1fqBrQdioHfM452V8pHWsMAAxyakjmVkxq3BuJiZgU5ln5nepJfs/3MrY6eeivElMIOM+nVVbbocU6zzmU=', 'base64'),
                    'Text to sign',
                    network
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message even if no network is specified', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
                    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
                    'Text to sign'
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message for \'bitcoin\' network', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
                    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
                    'Text to sign',
                    'bitcoin'
                );

                expect(result).to.be.true;
            });

            it('should successfully verify message for \'testnet\' network', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mzAXChctdFxzthPC4oLTftkPfDVEMnm3i3',
                    'H8CtldBhDWWrlj8qNsGHMPZgZwvMiW+GRHu/59g8EvhTCSZSmDjwj/atgUBlC/bP9PlM3cceySdilY3N/0xRdI8=',
                    'Text to sign',
                    'testnet'
                );

                expect(result).to.be.true;
            });

            it('should return false if message cannot be verified', function () {
                const result = btcMsgVerifier.verifyMessage(
                    'mkPa87aADjgNYfiVNV7tUkxmbB3qmbE7cg',
                    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
                    'Another text to sign',
                    network
                );

                expect(result).to.be.false;
            });

            it('should throw if an error takes place while verifying the message', function () {
                expect(() => btcMsgVerifier.verifyMessage(
                    'invalid_address',
                    'H+dKQFYTbZwwqcExYap/ykVG23qRuxEbFOVfFoPBnBKWfI5jDPt61Y9pchdGkDULQ+x79ke8SosVpYygyVX8TDg=',
                    'Another text to sign',
                    network
                )).to.throw(/^Error verifying message: /);
            });
        });
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = testSuite;
    }
    else {
        this.testSuite = testSuite;
    }
})();
