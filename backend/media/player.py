"""
This module implements a simple gstreamer-based music player.

TODO:
 * Replaygain sink support

"""

import json
import threading

import gi
from gi.repository import Gst, GObject
gi.require_version('Gst', '1.0')



class Player:
    """
    This class implements a simple gstreamer-based music player.
    """
    def __init__(self):
        Gst.init(None)

        self.player = Gst.ElementFactory.make("playbin", "player")
        fakesink = Gst.ElementFactory.make("fakesink", "fakesink")
        self.player.set_property("video-sink", fakesink)

        bus = self.player.get_bus()
        bus.add_signal_watch()
        bus.connect("message", self._handle_event)
        self._last_event = None


        def _run():
            loop = GObject.MainLoop()
            loop.run()
        self._event_thread = threading.Thread(target=_run)
        self._event_thread.start()

        self._event_listeners = {1: print}
        self._event_listener_last_id = 1


    def register_listener(self, listener):
        """
        Register the listener function to be called every time
        the player produces any event.
        Return listener_id, which specifies the function.
        """
        self._event_listener_last_id += 1
        self._event_listeners[self._event_listener_last_id] = listener
        return self._event_listener_last_id

    def unregister_listener(self, listener_id):
        """
        Deletes the listener by listener_id.
        """
        del self._event_listeners[listener_id]

    def play(self, location):
        """
        Plays the track at specified location.
        """
        self.player.set_state(Gst.State.NULL)
        self.player.set_property("uri", location)
        self.player.set_state(Gst.State.PLAYING)

    def pause(self):
        """
        Sets the player state to PAUSED.
        """
        self.player.set_state(Gst.State.PAUSED)

    def resume(self):
        """
        Sets the player state to PLAYING.
        """
        self.player.set_state(Gst.State.PLAYING)

    def _handle_event(self, _, message):
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
