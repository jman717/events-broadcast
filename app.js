"use strict"

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* Main processing app
*/

var colors = require('colors'),
    owner

module.exports = class Broadcast {
    constructor() {
        var t = this
        try {
            owner = t
            t.groups = []
            t.appenders_dir = './lib/appenders/'
            t.resolve
            t.reject
            t.errorArray = []
            console.log('jrm debug 20.00'.red)
            new Promise((resolve, reject) => {
                t.resolve = resolve
                t.reject = reject
            }).then(data => {
                console.log('jrm debug RESOLVE(' + data + ')')
            },
                reject => {
                    t.errorArray.push(reject)
                    t.errorArray.push('jrm debug 33.00')
                    console.log('jrm debug REJECT(' + reject + ')')
                }
            )
        } catch (e) {
            e.message = "broadcast app.js constructor error: " + e.message
            throw (e)
        }
    }

    set({ group }) {
        var t = owner, s
        try {
            if (typeof group == 'undefined')
                throw new Error('group is undefined')
            s = 'jrm debug 20.01=' + group.name
            group.init = false
            t.groups.push(group)
            console.log(s.red)

            return t
        } catch (e) {
            e.message = "broadcast app.js set error: " + e.message
            throw (e)
        }
    }

    init() {
        var t = owner, a, s
        try {
            t.groups.forEach(function (group) {
                console.log('jrm debug a(' + JSON.stringify(group) + ')')
                if (typeof group.init == 'undefined')
                    group.init = false
                s = 'jrm debug 20.02=' + group.name
                if (!group.init) {
                    group.init = true
                }
            })
            return t
        } catch (e) {
            e.message = "app.js init error: " + e.message
            console.log('jrm debug error: ' + e.message)
            throw (e)
        }
    }

    on({ groups, events }, callback) {
        var t = owner, s
        try {
            if (typeof groups == 'undefined')
                throw new Error('groups is undefined')
            if (typeof events == 'undefined')
                throw new Error('events is undefined')
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            s = 'jrm debug 20.03'
            console.log(s.red)
            return t
        } catch (e) {
            e.message = "broadcast app.js on error: " + e.message
            throw (e)
        }
    }

    error(callback) {
        var t = owner, s
        try {
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            callback(t.errorArray)
            return t
        } catch (e) {
            e.message = "broadcast app.js on error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }

    success(callback) {
        var t = owner, s
        try {
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            if (t.errorArray.length) {
                callback('done')
            }
            return t
        } catch (e) {
            e.message = "broadcast app.js on success: " + e.message
            throw (e)
        }
    }

    do({ groups, events }) {
        var t = owner, s
        try {
            if (typeof groups == 'undefined')
                throw new Error('groups is undefined')
            if (typeof events == 'undefined')
                throw new Error('events is undefined')
            s = 'jrm debug 20.03=' + typeof groups
            console.log(s.red)
            t.reject('got a hot one')
            return t
        } catch (e) {
            e.message = "broadcast app.js do error: " + e.message
            throw (e)
        }
    }
}
