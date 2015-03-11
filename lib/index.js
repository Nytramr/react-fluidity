'use strict';
var objectAssign = require('object-assign');
var React = require('react');
var EventEmitter = require('events').EventEmitter;

/**********/
/* Stores */
/**********/

var DispSubscriber = require('./disp-subscriber');

var CHANGE_EVENT = "$$change$$";

module.exports.createStore = function (config) {
  config = config || {};

  objectAssign(config, EventEmitter.prototype, {
    //EventEmitter handlers
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    
    emitChange: function (params) {
      this.emit(CHANGE_EVENT, params);
    },

    subscribe: function (dispatcher) {
      //Returns an object that can handle Dispatcher's actions
      return new DispSubscriber(config, dispatcher);
    }
  });

  return config;
};

/*********************/
/* Component Wrapper */
/*********************/

module.exports.createComponent = function (config) {
  
  var wrapper = {};
  
  var merged = objectAssign({}, config, {
    componentWillMount: function(){
      PresentationStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
      PresentationStore.removeChangeListener(this._onChange);
    }
  });//wrapper);
  
  return React.createClass(merged);
};


