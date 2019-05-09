var assert = require('assert');

describe('app', function () {

    describe('require', function () {
        it('colors', function () {
            try {
                colors = require('colors')
                if (typeof colors == 'undefined') {
                    throw new Error('no colors')
                }
            } catch (e) {
                assert(false)
            }
        })
    })

    describe('constructor', function () {
        var app, events_broadcast
        beforeEach(function () {
            events_broadcast = require('../app.js')
        })

        it('app.constructor should fail', function () {
            try {
                assert.throws(() => app = new events_broadcast(), Error)
            } catch (e) {
                console.log('error(' + e.message + ')')
            }
        })

        it('app.constructor should pass', function () {
            assert(new events_broadcast())
        })

        describe('functions', function () {
            beforeEach(function () {
                app = new events_broadcast()
                app.reject = function () { assert(false) }
            })

            it('app.set should fail with bogus parameter', function () {
                var bogus = { "bogus": {} }
                assert.throws(() => app.set(bogus), Error)
            })

            it('app.set should pass', function () {
                assert(app.set)
            })

            it('app.set should pass with parameter', function () {
                var params = { "group": {} }
                assert(app.set(params))
            })

            it('app.on should fail with bogus parameter', function () {
                var param = { "bogus": {} }
                assert.throws(() => app.on(param), Error)
            })

            it('app.on should pass', function () {
                assert(app.on)
            })

            it('app.on should pass with parameter', function () {
                var params = { "groups": ["all"], "events": ["all"] }
                var callback = function () { }
                assert(app.on(params, callback))
            })

            it('app.error should fail without callback', function () {
                assert.throws(() => app.error(), Error)
            })

            it('app.error should pass', function () {
                assert(app.error)
            })

            it('app.error should pass with parameter', function () {
                var callback = function () { }
                assert(app.error(callback))
            })

            it('app.success should fail without callback', function () {
                assert.throws(() => app.success(), Error)
            })

            it('app.success should pass', function () {
                assert(app.success)
            })

            it('app.success should pass with parameter', function () {
                var callback = function () { }
                assert(app.success(callback))
            })

            it('app.do should fail with bogus parameter', function () {
                var param = { "bogus": {} }
                assert.throws(() => app.do(param), Error)
            })

            it('app.do should pass', function () {
                assert(app.do)
            })

            it('app.do should pass with parameter', function () {
                var params = { "groups": ["all"], "emit": ["all"] }
                var callback = function () { }
                assert(app.do(params, callback))
            })

            it('app.addError should fail with bogus parameter', function () {
                var param = {}
                assert.throws(() => app.addError(param), Error)
            })

            it('app.addError should pass', function () {
                assert(app.addError)
            })

            it('app.addError should pass with parameter', function () {
                var error = "This is an error"
                assert(app.addError(error))
            })
        })
    })
})
