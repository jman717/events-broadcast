"use strict"

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2025-10-02
* test functions
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
            "show": true, 
            "color": {
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

function run_refresh (data) {
    const msg = `msg: Refresh id (${data.id}). This is function run_refresh. Do something here.`
    logger.trace(msg).tag(lne).tagline()
}

function another_refresh (data) {
    const msg = `msg: Refresh id (${data.id}). This is function another_refresh. Do something here.`
    logger.trace(msg).tag(lne).tagline()
}

var eb = new events_broadcast()
    .set({ "group": { "name": "group-1", "events": [{ "event": "refresh", "id": 1, "function": run_refresh }, { "event": "two", "id": 2 }] } })
    .set({ "group": { "name": "group-2", "events": [{ "event": "one", "id": 1 }, { "event": "two", "id": 2 }, { "event": "refresh", "id": 2, "function": another_refresh }] } })
    .set({ "group": { "name": "group-3", "events": [{ "event": "refresh", "id": 3, "function": run_refresh }] } })
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
    .do({ "groups": "all", "emit": ["refresh"] })
    .done()

