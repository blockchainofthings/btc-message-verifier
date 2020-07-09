/**
 * Created by claudio on 2020-07-07
 */

const wpConfig = require('./webpack.config');

wpConfig.target = 'node';
wpConfig.resolve = {
    extensions: ['.js', '.mjs'],
    mainFields: ['main', 'module']
};

module.exports = wpConfig;
