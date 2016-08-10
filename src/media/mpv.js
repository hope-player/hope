import net from 'net';
import Immutable from 'immutable';

class Mpv {
  constructor() {
    this.client = new net.Socket();
    this.client.connect('/tmp/hope-mpv-socket');

    this.listeners = Immutable.Map();

    this.client.on('data', rawData => {
      rawData.toString().split('\n').forEach((item) => {
        if (item && item.length !== 0) {
          const data = JSON.parse(item);
          try {
            if ('event' in data && this.listeners.has(data.event)) {
              this.listeners.get(data.event).forEach(listener => {
                listener(data);
              });
            } else {
              console.log(data.event);
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    });

    this.client.on('end', () => {
      console.log('Connection ended');
    });

    this.client.on('close', () => {
      console.log('Connection closed');
    });

    this.client.on('connect', () => { console.log('connected'); });

    this.addListener = this.addListener.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  addListener(event, listener) {
    let oldListeners = [];
    if (this.listeners.has(event)) {
      oldListeners = this.listeners.get(event);
    }
    oldListeners.push(listener);
    this.listeners = this.listeners.set(event, oldListeners);
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
