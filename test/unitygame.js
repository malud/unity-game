var should = require('chai').should(),
    unitygame = require('../src/unitygame.js');

describe('#loadable?\n', function () {
    it('check the version number', function () {
        unitygame.version().should.equal(require('./../package.json').version);
    });
});
