import React, { Component } from "react";

// Describe the data stored in this component's state.
interface CounterState {
  count: number;
}

// Counter has no props, so its props type is an empty object.
class Counter extends Component<object, CounterState> {
  // Initialize the state with a numeric count.
  state: CounterState = {
    count: 0,
  };

  // Use the previous state so the increment always uses the latest count.
  increment = (): void => {
    this.setState((previousState) => ({
      count: previousState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
