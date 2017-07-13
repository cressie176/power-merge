var assert = require('chai').assert
var reference = require('../../lib/commands/reference')

describe('reference command', function() {

    it('should reference "a" by default', function() {
        var cmd = reference()
        var facts = {
            a: { value: { foo: 1 } },
            b: { value: { foo: 2 } }
        }

        var result = cmd(facts)
        assert.equal(result.foo, facts.a.value.foo)
        assert.ok(result === facts.a.value)
    })

    it('should reference "b" when specified', function() {
        var cmd = reference(['b', 'value'])
        var facts = {
            a: { value: { foo: 1 } },
            b: { value: { foo: 2 } }
        }

        var result = cmd(facts)
        assert.equal(result.foo, facts.b.value.foo)
        assert.ok(result === facts.b.value)
    })
})
