"use strict"

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* test application
*/

var colors = require('colors'),
    log4js = require("log4js"),
    log4js_tagline = require("log4js-tagline"),
    events_broadcast = require('./app.js'),
    tagline,
    logger,
    append,
    lne


log4js.configure({
    appenders: { myLog: { type: 'file', filename: 'my.log' } },
    categories: { default: { appenders: ['myLog'], level: 'debug' } }
})

tagline = new log4js_tagline(log4js, {
    "display": ["trace", "debug", "info", "warn", "error", "fatal", "mark"],
    "output": {
        "to_local_file": true,
        "to_datadog": true
    }
})
logger = log4js.getLogger('myLog')

append = tagline.appender('line')
lne = new append(tagline).setConfig({ "format": "lne(@name(): @file:@line:@column)" })

console.log('jrm debug 88.00')
logger.debug('show this line').tag(lne).tagline()

var eb = new events_broadcast()
    .set({ "group": { "name": "group-1", "events": [{ "event": "refresh", "id": 1 }, { "event": "two", "id": 2 }] } })
    .set({ "group": { "name": "group-2", "events": [{ "event": "one", "id": 1 }, { "event": "two", "id": 2 }, { "event": "refresh", "id": 3 }] } })
    .set({ "group": { "name": "group-3", "events": [{ "event": "refresh", "id": 1 }] } })
    .init()
    .on({ "groups": "all", "events": "all" }, function ({ response }) {

    }).error(function (err) {

    })
    .on({ "groups": "all", "events": ["refresh"] }, function ({ response }) {

    })
    .on({ "groups": ["group-1"], "events": ["one", "two"] }, function ({ response }) {

    })
    .do({ "groups": "all", "emit": "all" })
    .do({ "groups": "all", "emit": ["refresh"] })
    .do({ "groups": ["group-2"], "emit": ["two"] })
    .do({ "groups": ["group-1"], "emit": "all" })
    .error(function (errArray) {
        console.log('jrm debug 22.00 error')
        console.log('ERRORS:')
        errorArray.forEach(function (item) {
            console.log("   " + item)
        })

    }).success(function (data) {
        console.log('jrm debug 22.01 error')

    })

console.log('done'.blue)