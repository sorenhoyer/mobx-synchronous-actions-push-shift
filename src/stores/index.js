import { observable, action } from "mobx";
import Sensor from "../models/Sensor";

export default class RootStore {
  @observable sensors = new Map();

  constructor() {
    let self = this;
    const sensorIds = [
      "sensor1",
      "sensor2",
      "sensor3",
      "sensor4",
      "sensor5",
      "sensor6",
      "sensor7",
      "sensor8",
      "sensor9",
      "sensor10"
    ];

    for (let sensor of sensorIds) {
      self.sensors.set(sensor, new Sensor(5));
    }

    // setInterval simulates some incoming data (originally from SignalR, and roughly each second)
    setInterval(function() {
      let out = {};
      const x = +new Date(); // unix timestamp
      for (let sensor of sensorIds) {
        const y = Math.floor(Math.random() * 10000) + 1;
        const m = { x: x, y: y };
        out[sensor] = m;
      }

      self.addMeasurement(out); // the problem starts here.
    }, 1000);
  }

  // the problem!
  @action
  addMeasurement(sensorMeasurementMap) {
    let self = this;
    // this timeout is to try and simulate a race condition
    // since each measurement is incoming each second,
    // here some of them will take as long as 6 seconds to add,
    // due to the timeout.
    // the point is that they should always be added,
    // in the order they were called in.
    // so if the first measurement takes 20 seconds to be added,
    // the next measurements that were received on 2, 3, 4, 5..., 19th second etc,
    // should all "wait" for the prev measurement, so they're added
    // in the right order (order can be checked by timestamp, x)
    setTimeout(() => {
      const keys = self.sensors.keys();

      if (keys.length === 0) {
        // never really gonna happen, since we already set them above
      } else {
        for (const key in sensorMeasurementMap) {
          if (self.sensors.keys().indexOf(key) > -1) {
            self.sensors.get(key).add(sensorMeasurementMap[key]);
          } else {
            // also not gonna happen in this example
          }
        }
      }
    }, Math.floor(Math.random() * 20 + 1) * 1000);
  }
}
