import Queue from "./Queue";
import { observable, action } from "mobx";

export default class Sensor {
  @observable queue;

  constructor(n) {
    this.n = n;
    this.queue = new Queue(this.n);
  }
  @action
  add(measurement) {
    this.queue.add(measurement);
  }
}
