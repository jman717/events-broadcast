"use strict"

const { stringify } = require('querystring')

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* Main processing app
*/

var colors = require('colors'),
    EventEmitter = require('events'),
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
            t.events = new EventEmitter()
            t.groups_events = {}
            t.error_callback = function () { }
            t.success_callback = function () { }
            new Promise((resolve, reject) => {
                t.resolve = resolve
                t.reject = reject
            }).then(data => {
                t.success_callback(data)
            }, reject => {
                t.addError(reject)
                t.error_callback(t.errorArray)
            })
        } catch (e) {
            e.message = "broadcast app.js constructor error: " + e.message
            throw (e)
        }
    }

    addError(err) {
        var t = owner, s
        try {
            if (typeof err != 'string')
                throw new Error('err is not a string')
            if (t.errorArray.length == 0) {
                t.errorArray.push('ERROR:')
            }
            t.errorArray.push(err)
            return t
        } catch (e) {
            e.message = "broadcast app.js set error: " + e.message
            t.reject(e.message)
            return t
        }
    }

    set({ group }) {
        var t = owner, s
        try {
            if (typeof group == 'undefined')
                throw new Error('group is undefined')
            group.init = false
            t.groups.push(group)
            //t.init()
            return t
        } catch (e) {
            e.message = "broadcast app.js set error: " + e.message
            t.reject(e.message)
            return t
        }
    }

    error(callback) {
        var t = owner
        try {
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            t.error_callback = callback
            return t
        } catch (e) {
            e.message = "broadcast app.js on error: " + e.message
            t.reject(e.message)
            return t
        }
    }

    success(callback) {
        var t = owner, s
        try {
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            t.success_callback = callback
            return t
        } catch (e) {
            e.message = "broadcast app.js on success: " + e.message
            t.reject(e.message)
            return t
        }
    }

    done() {
        var t = owner
        try {
            if (!t.errorArray.length)
                t.resolve('success done')
            else
                t.reject('errors detected')
            return t
        } catch (e) {
            e.message = "broadcast app.js on success: " + e.message
            t.reject(e.message)
            return t
        }
    }

    on({ groups, events }, callback) {
        var t = owner, ev, groups_a, events_a, g_include, e_include, params
        try {
            if (typeof groups == 'undefined')
                throw new Error('groups is undefined')
            if (typeof groups.length != "number")
                throw new Error('groups is not an array')
            if (typeof events == 'undefined')
                throw new Error('events is undefined')
            if (typeof callback != 'function')
                throw new Error('callback is not a function')
            groups_a = groups
            events_a = events
            if (typeof events == "string") {
                events_a = []
                events_a.push(events)
            }
            if (typeof groups == "string") {
                groups_a = []
                groups_a.push(groups)
            }
            groups_a.forEach(function (gpa) {
                t.groups.forEach(function (grp) {
                    g_include = false
                    if (gpa == "all")
                        g_include = true
                    if (grp.name == gpa)
                        g_include = true

                    if (g_include) {
                        grp.events.forEach(function (evt) {
                            events_a.forEach(function (em) {
                                e_include = false
                                params = { "name": "", "event": "" }
                                if (em == "all")
                                    e_include = true
                                if (evt.event == em)
                                    e_include = true

                                if (e_include) {
                                    ev = grp.name + '_' + evt.event
                                    t.groups_events[ev] = { "callback": callback }
                                    t.events.on(ev, function (data) {
                                        t.groups_events[ev]["callback"](data)
                                    })
                                }
                            })
                        })
                    }
                })
            })
            return t
        } catch (e) {
            e.message = "broadcast app.js on error: " + e.message
            console.log(e.message)
            t.reject(e.message)
            return t
        }
    }

    do({ groups, emit }) {
        var t = owner, ev, params, g_include, e_include, params, emit_a, groups_a
        try {
            if (typeof groups == 'undefined')
                throw new Error('groups is undefined')
            if (typeof emit == 'undefined')
                throw new Error('emit is undefined')
            groups_a = groups
            emit_a = emit
            if (typeof emit == "string") {
                emit_a = []
                emit_a.push(emit)
            }
            if (typeof groups == "string") {
                groups_a = []
                groups_a.push(groups)
            }
            groups_a.forEach(function (gpa) {
                t.groups.forEach(function (grp) {

                    g_include = false
                    if (gpa == "all")
                        g_include = true
                    if (grp.name == gpa)
                        g_include = true

                    if (g_include) {
                        grp.events.forEach(function (evt) {
                            emit_a.forEach(function (em) {
                                e_include = false
                                params = { "name": "", "event": "" }
                                if (em == "all")
                                    e_include = true
                                if (evt.event == em)
                                    e_include = true
                                if (e_include) {
                                    params.name = grp.name
                                    params.event = evt

                                    ev = grp.name + '_' + evt.event
                                    t.events.emit(ev, params)
                                    try {
                                        if (typeof (evt.function) == "function") {
                                            evt.function(evt)
                                        }
                                    } catch (e) {
                                        //do nothing
                                    }
                                }
                            })
                        })
                    }
                })
            })
            return t
        } catch (e) {
            e.message = "broadcast app.js do error: " + e.message
            t.reject(e.message)
            return t
        }
    }
}
