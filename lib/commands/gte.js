var debug = require('debug')('power-merge:commands:gte')
var getView = require('../getView')

module.exports = function gte(path, value) {

    var view = getView(path)

    return function(context, facts) {

        debug('value: %o, path: %o, facts: %o', value, path, facts)
        var result = view(facts) >= value

        debug('return: %s', result)
        return result
    }
}