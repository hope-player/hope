import json
import threading

import gi
gi.require_version('Gst', '1.0')
from gi.repository import Gst, GObject


class Player:
    def __init__(self):
        Gst.init(None)

        self.player = Gst.ElementFactory.make("playbin", "player")
        fakesink = Gst.ElementFactory.make("fakesink", "fakesink")
        self.player.set_property("video-sink", fakesink)

        bus = self.player.get_bus()
        bus.add_signal_watch()
        bus.connect("message", self.handle_event)
        self._last_event = None

        self._event_thread = threading.Thread(target=self._run)
        self._event_thread.start()

        self._event_listeners = {1: print}
        self._event_listener_lastId = 1

    def _run(self):
        loop = GObject.MainLoop()
        loop.run()

    def register_listener(self, listener):
        self._event_listener_lastId += 1
        self._event_listeners[self._event_listener_lastId] = listener
        return self._event_listener_lastId

    def unregister_listener(self, listener_id):
        del self._event_listeners[listener_id]

    def play(self, location):
        self.player.set_state(Gst.State.NULL)
        self.player.set_property("uri", location)
        self.player.set_state(Gst.State.PLAYING)

    def pause(self):
        self.player.set_state(Gst.State.PAUSED)

    def resume(self):
        self.player.set_state(Gst.State.PLAYING)

    def handle_event(self, bus, message):
        event = None
        message_type = message.type
        if message_type == Gst.MessageType.STATE_CHANGED:
            old_state, new_state, _ = message.parse_state_changed()
            event = json.dumps({'event': 'state_changed', 'data': [old_state, new_state]})
        elif message_type == Gst.MessageType.EOS:
            event = json.dumps({'event': 'eos', 'data': []})
        if not event or event == self._last_event:
            return None
        else:
            self._last_event = event
        for listener in self._event_listeners:
            self._event_listeners[listener](event)


if __name__ == '__main__':
    pl = Player()
    pl.play('..')
