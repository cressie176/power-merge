var assert = require('chai').assert
var matches = require('../../lib/commands/matches')
var Context = require('../../lib/Context')

describe('matches command', function() {

    var context = new Context()

    it('should test facts with regex', function() {
        var cmd = matches(/^1$/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: 1 } }), true)
        assert.equal(cmd({ a: { value: 11 } }), false)
    })

    it('should test facts with pattern', function() {
        var cmd = matches('1', ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: 1 } }), true)
        assert.equal(cmd({ a: { value: 2 } }), false)
    })

    it('should return false when null', function() {
        var cmd = matches(/null/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: null } }), false)
    })

    it('should return false when undefined', function() {
        var cmd = matches(/undefined/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: undefined } }), false)
    })

    it('should return false when infinity', function() {
        var cmd = matches(/Infinity/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: 1/0 } }), false)
    })

    it('should return false when NaN', function() {
        var cmd = matches(/NaN/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: parseInt('A', 10) } }), false)
    })

    it('should tolerate dates', function() {
        var d = new Date('Thu Jul 13 2017 16:45:17 GMT+0100 (BST)')
        var cmd = matches(/2017/, ['a', 'value'])(context)
        assert.equal(cmd({ a: { value: d } }), true)
    })

    it('should throw error on invalid patterns', function() {
        assert.throws(function() {
            matches('[abc', ['a', 'value'])(context)
        }, /Invalid regular expression/)
    })

})
