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

        self.bus = self.player.get_bus()
        self.bus.add_signal_watch()
        self.bus.connect("message", self.handle_event)

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
        for listener in self._event_listeners:
            self._event_listeners[listener](message)


if __name__ == '__main__':
    pl = Player()
    pl.play('..')
