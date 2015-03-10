'use strict';

var DispSubscriber = function (rf, dispatcher){
  
  var actionHandlers = {};
  
  var _getActionHandler = function (payload) {

    return (actionHandlers[''] || []).concat(actionHandlers[payload.source] || [],
                                             actionHandlers[payload.action.actionType] || [],
                                             actionHandlers[payload.source + '|' + payload.action.actionType] || []);
  };
  
  var _handleAction = function (payload) {
    var handlers = _getActionHandler(payload);
    var i;
    
    for (i = handlers.length - 1; i >= 0; i--) {
      handlers[i].call(rf, payload.action);
    }
  };
  
  this.onAction = function () {
    var args = Array.prototype.slice.call(arguments)
    , cb = args.pop()
    , key = args.join('|');

    if (typeof cb === 'function'){
      var handlers = actionHandlers[key] || (actionHandlers[key] = []);
      if (handlers.indexOf(cb) == -1 ) {
        handlers.push(cb);
      }
    } else {
      console.warn("The last argumant must be a function");
    }
    
    return this;
  };
  
  this.off = function() {
    var args = Array.prototype.slice.call(arguments)
    , cb = args.pop()
    , key = args.join('|');
    
    if (typeof cb === 'function'){
      console.log("To be implemented");
    } else {
      console.warn("The last argumant must be a function");
    }
    
    return this;
  };
  
  var _dispatcherHandler = function (payload) {
    _handleAction(payload);
    rf.emitChange();
    return true;
  };
  
  dispatcher.register(_dispatcherHandler);
  
};

module.exports = DispSubscriber;