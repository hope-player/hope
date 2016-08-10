import net from 'net';
import Immutable from 'immutable';

class Mpv {
  constructor() {
    this.client = new net.Socket();
    this.client.connect('/tmp/hope-mpv-socket');

    this.listeners = Immutable.Map();
    this.expectants = Immutable.Map();

    this.client.on('data', rawData => {
      rawData.toString().split('\n').forEach((item) => {
        if (item && item.length !== 0) {
          const data = JSON.parse(item);
          try {
            if ('event' in data && this.listeners.has(data.event)) {
              this.listeners.get(data.event).forEach(listener => {
                listener(data);
              });
            } else if ('request_id' in data && this.expectants.has(data.request_id)) {
              this.expectants.get(data.request_id)(data.data);
              this.expectants.delete(data.request_id);
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    });
    this.client.write('{ "command": ["observe_property", 1, "duration"] }');
    this.addListener = this.addListener.bind(this);
    this.addExpectant = this.addExpectant.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  addListener(event, listener) {
    let oldListeners = [];
    if (this.listeners.has(event)) {
      oldListeners = this.listeners.get(event);
    }
    oldListeners.push(listener);
    this.listeners = this.listeners.set(event, oldListeners);
  }

  addExpectant(requestId, expectant) {
    this.expectants = this.expectants.set(requestId, expectant);
  }

  getTime(callback) {
    this.client.write('{ "command": ["get_property", "time-pos"], "request_id": 8 }\n');
    this.addExpectant(8, callback);
  }

  play(uri) {
    return new Promise((resolve, reject) => {
      try {
        this.client.write(`{ "command": ["loadfile", "${uri}"] }\n`, () => resolve());
      } catch (e) {
        reject(e);
      }
    });
  }

  pause() {
    return new Promise((resolve, reject) => {
      try {
        this.client.write('{ "command": ["set_property", "pause", true] }\n');
      } catch (e) {
        reject(e);
      }
    });
  }

  resume() {
    return new Promise((resolve, reject) => {
      try {
        this.client.write('{ "command": ["set_property", "pause", false] }\n');
      } catch (e) {
        reject(e);
      }
    });
  }
}

const singleton = new Mpv();
export default singleton;
