# React Fluidity

A react's objects factories collection that implements Flux Architecture in a simpler way.

All repetetive task you should do in order to make your omponents interact with your Dispatcher and your stores are already done.

## Install
```
$  npm install --save react-fluidity
```

## Usage

### Component Factory

```javascript
/** @jsx React.DOM */

var React = require('react');

var MyStore = require('path/to/my-store');

var Fluid = require('react-fluidity');

var MyComponent = Fluid.createComponent({
  getInitialState: function() {
    return {myData : MyStore.getData()};
  },
  componentWillMount: function(){
    //You do not have to include anything in order to observe stores
  },
  render: function () {
    var dataList = this.state.myData.map(function (data) {
      return (<li>{ data }</li>);
    });
    return (
      <div>
        <ul className="listClass">
          { dataList }
        </ul>
      </div>
    );
  }
});

MyComponent.subscribeStore(DiscographyStore).onChange(function(){
  this.setState({myData : MyStore.getData()});
});

module.exports = MyComponent;
```

### Store Factory
