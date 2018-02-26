import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class App extends Component {
  render() {
    return (
      <ul>
        {this.props.store.sensors.values().map(sensor => {
          return <li>{JSON.stringify(sensor.queue.data)}</li>;
        })}
      </ul>
    );
  }
}

export default App;
