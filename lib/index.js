'use strict';
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var DispSubscriber = require('./disp-subscriber');

var CHANGE_EVENT = "$$change$$";

module.exports.Store = function (obj) {
  obj = obj || {};
  
  objectAssign(obj, EventEmitter.prototype, {
    //EventEmitter handlers
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    
    subscribe: function (dispatcher) {
      //Returns an object that can handle Dispatcher's actions
      return new DispSubscriber(dispatcher);
    }
  });
  
  
  
  
  return obj;
};

