"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-04-24
* Handles a single event
*/

const colors = require('colors'),
    folders_base = require('./base.js'),
    owner

module.exports = class event extends base {
    constructor({ name, environment, consul, parent }) {
        super({ name, environment, parent })
        try {
            var t = this
            owner = t
        } catch (e) {
            e.message = 'event.constructor error: ' + e.message
            throw (e)
        }
    }
}