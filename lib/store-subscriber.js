'use strict';

var StoreSubscriber = function (component){

  var changeHandlers = [];
  
  this.handler = function () {
    var i;

    for (i = changeHandlers.length - 1; i >= 0; i--) {
      changeHandlers[i].apply(component, arguments);
    }
  };

  this.onChange = function (cb) {
    
    if (typeof cb === 'function'){
      if (changeHandlers.indexOf(cb) == -1 ) {
        changeHandlers.push(cb);
      }
    } else {
      console.warn("The argument must be a function");
    }

    return this;
  };
};

module.exports = StoreSubscriber;