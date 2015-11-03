/* eslint-disable */
try {
    var jsdom = require('jsdom');
    var document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    var window = document.defaultView;

    global.document = document;
    global.window = window;

    for (var key in window) {
        if (!window.hasOwnProperty(key)) {
            continue;
        } else if (key in global) {
            continue;
        } else {
            global[key] = window[key]
        }
    }
    require('babel-core/register')({
        optional: ['es7.decorators']
    });
} catch (e) {
}
