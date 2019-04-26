"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* base object for all appenders
*/

const colors = require('colors')

module.exports =  class base {
    constructor() {
        try {
            var t = this
            t.appenders_dir = './appenders/'
        } catch (e) {
            e.message = 'base.constructor error: ' + e.message
            throw (e)
        }
    }
}