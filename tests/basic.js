"use strict"

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* test application
*/

var colors = require('colors'),
    log4js = require("log4js"),
    log4js_tagline = require("log4js-tagline"),
    events_broadcast = require('../app.js'),
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
        "to_console": {
            "show": true, "color": {
                "trace": "blue",
                "debug": "bgCyan",
                "info": "blue",
                "warn": "yellow",
                "error": "red",
                "fatal": "red",
                "mark": "white"
            }
        },      /* send output to console.log */
        "to_local_file": true,
        "to_datadog": true
    }
})
logger = log4js.getLogger('myLog')

append = tagline.appender('line')
lne = new append(tagline).setConfig({ "format": "lne(@name(): @file:@line:@column)" })

logger.debug('start of test').tag(lne).tagline()

var eb = new events_broadcast()
    .set({ "group": { "name": "group-1", "events": [{ "event": "refresh", "id": 1 }, { "event": "two", "id": 2 }] } })
    .set({ "group": { "name": "group-2", "events": [{ "event": "one", "id": 1 }, { "event": "two", "id": 2 }, { "event": "refresh", "id": 3 }] } })
    .set({ "group": { "name": "group-3", "events": [{ "event": "refresh", "id": 1 }] } })
    .error(function (errorArray) {
        errorArray.forEach(function (item) {
            logger.error(item).tag(lne).tagline()
        })
    }).success(function (data) {
        logger.info(data).tag(lne).tagline()
    })
    .on({ "groups": "all", "events": "all" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    /*
    .on({ "groups": "all", "events": "refresh" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    .on({ "groups": "all", "events": "one" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    /*
    .on({ "groups": "all", "events": "two" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    .on({ "groups": "group-2", "events": "one" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    .on({ "groups": "group-2", "events": "refresh" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
    .on({ "groups": "group-1", "events": "refresh" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })

    .on({ "groups": "all", "events": "all" }, function (data) {
        var d = JSON.stringify(data)
        logger.info(d).tag(lne).tagline()
    })
   .on({ "groups": ["group-1", "group-2"], "events": ["one", "refresh"] }, function (data) {
        var d = "This is ONE, REFRESH processing(" + JSON.stringify(data) + ")"
        logger.info(d).tag(lne).tagline()
    })
    */
    .do({ "groups": "all", "emit": ["all"] })
    //.do({ "groups": "all", "emit": "all" })
    //.do({ "groups": ["group-1", "group-2"], "emit": ["one", "refresh"] })
    //.do({ "groups": "all", "emit": ["one", "two"] })
    //.do({ "groups": "["group-1", "group-2"]", "emit": ["one", "refresh"] })
    //.do({ "groups": ["group-2"], "emit": ["two"] })
    .done()

