'use strict';
var objectAssign = require('object-assign');
var React = require('react');
var EventEmitter = require('events').EventEmitter;

/**********/
/* Stores */
/**********/

var DispSubscriber = require('./disp-subscriber');

var CHANGE_EVENT = "$$change$$";

module.exports.createStore = function (obj) {
  obj = obj || {};

  objectAssign(obj, EventEmitter.prototype, {
    //EventEmitter handlers
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    
    emitChange: function () {
      this.emit(CHANGE_EVENT);
    },

    subscribe: function (dispatcher) {
      //Returns an object that can handle Dispatcher's actions
      return new DispSubscriber(obj, dispatcher);
    }
  });

  return obj;
};

/*********************/
/* Component Wrapper */
/*********************/

module.exports.createComponent = function (obj) {
  var component = React.createClass();
};


