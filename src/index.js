import React from "react";
import { render } from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
  @observable data = {};
  maxCount = 20;

  constructor() {
    let self = this;
    this.keys = ["key1", "key2", "key3", "key4", "key5"];
    this.data = { key1: [], key2: [], key3: [], key4: [], key5: [] };

    setInterval(() => {
      for (let key of this.keys) {
        if (self.data[key].length < self.maxCount) {
          self.pushToArr(key);
        } else {
          self.shiftFromArr(key);
        }
      }
    }, 1000);
  }

  @action
  pushToArr(key) {
    let self = this;
    setTimeout(function() {
      self.data[key].push(Math.floor(Math.random() * 100));
    }, (Math.floor(Math.random() * 6) + 1) * 1000);
  }

  @action
  shiftFromArr(key) {
    this.data[key].shift();
  }
}

const appState = new AppState();

const MyComponent = observer(({ appState }) => {
  let html = "";
  html = Object.keys(appState.data).map(key => {
    return <li>{JSON.stringify(appState.data[key])}</li>;
  });

  return <ul>{html}</ul>;
});

render(
  <div>
    <MyComponent appState={appState} />
    <DevTools />
  </div>,
  document.getElementById("root")
);
