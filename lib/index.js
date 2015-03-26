'use strict';
var Assign = require('object-assign');
var React = require('react');
var EventEmitter = require('events').EventEmitter;

//Bind Polyfill, Remove once ES5 become the standar for all browsers
require('polyfill-function-prototype-bind');

/**********/
/* Stores */
/**********/

var DispSubscriber = require('./disp-subscriber');

var CHANGE_EVENT = "$$change$$";

module.exports.createStore = function (config) {
  config = config || {};

  Assign(config, EventEmitter.prototype, {
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

var StoreSubscriber = require('./store-subscriber');

module.exports.createComponent = function (config) {

  var stores = [];

  var merged = Assign({}, config, {
    componentWillMount: function(){
      var i;
      for (i = stores.length - 1; i >= 0; i--) {
        stores[i][0].addChangeListener(stores[i][1]);
      }
      
      if (config.componentWillMount) {
        config.componentWillMount.apply(this, arguments);
      }
    },
    componentWillUnmount: function(){
      var i;
      for (i = stores.length - 1; i >= 0; i--) {
        stores[i][0].removeChangeListener(stores[i][1]);
      }

      if ( config.componentWillUnmount ) {
        config.componentWillUnmount.apply(this, arguments);
      };
    },
    statics: {
      subscribeStore: function (store) {
        var storeSubsc = new StoreSubscriber(this);
        stores.push([store, storeSubsc.handler]);
        return storeSubsc;
      }
    }
  });

  return React.createClass(merged);
};

