import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import Immutable from 'immutable';

import Library from '../library/library';
import Player from '../media/mpv';

import { rootNode } from '../reducers/library';


function* initLibrary() {
  yield put({ type: 'TOGGLE_REQUESTED', node: null });
}

function* play(action) {
  try {
    const uri = yield call(Library.getStream, action.track.get('source'), action.track.get('id'));
    yield call(Player.play, uri);
    yield put({ type: 'PLAY_SUCCEEDED', index: action.index });
    yield put({ type: 'CURRENT_TRACK_UPDATED', track: action.track });
  } catch (e) {
    yield put({ type: 'PLAY_FAILED', message: e.message });
  }
}

function* playRelative(action) {
  const index = yield select(state => state.playlist.get('active') + action.offset);
  const track = yield select(state => state.playlist.getIn(['playlist', index]));
  yield put({ type: 'PLAY_REQUESTED', track, index });
}

function* resumePause(method, success, failure) {
  try {
    yield call(Player[method]);
    yield put({ type: success });
  } catch (e) {
    console.log(e);
    yield put({ type: failure, message: e.message });
  }
}

function* pause() {
  yield resumePause('pause', 'PAUSE_SUCCEEDED', 'PAUSE_FAILED');
}

function* resume() {
  yield resumePause('resume', 'RESUME_SUCCEEDED', 'RESUME_FAILED');
}

function* changeState(action) {
  yield put({ type: 'STATE_CHANGE_SUCCEEDED', state: action.state });
}

function* toggle(action) {
  try {
    let node = action.node;
    if (node === null) {
      node = rootNode;
    }
    if (node.expanded === true) {
      yield put({
        type: 'TOGGLE_SUCCEEDED',
        data: null,
        node,
      });
    } else {
      const data = yield call(Library.expand, node.get('source'), node.get('type'), node.get('id'));
      yield put({
        type: 'TOGGLE_SUCCEEDED', data, node,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: 'TOGGLE_FAILED', message: e.message });
  }
}

function* _addToPlayList(node) {
  if (node.get('type') === 'track') {
    return [node];
  }
  let children;
  let result = [];
  if (node.get('expanded')) {
    children = node.get('children');
  } else {
    children = yield call(Library.expand, node.get('source'), node.get('type'), node.get('id'));
  }
  for (const child of children) {
    const update = yield _addToPlayList(Immutable.fromJS(child));
    result = result.concat(update);
  }
  return result;
}

function* addToPlayList(action) {
  const result = yield _addToPlayList(action.node);
  yield put({
    type: 'ADD_TO_PLAYLIST_SUCCEEDED',
    tracks: result,
  });
}

function* mainSaga() {
  yield [
    takeEvery('LIBRARY_INIT', initLibrary),
    takeEvery('PLAY_REQUESTED', play),
    takeEvery('PLAY_RELATIVE', playRelative),
    takeEvery('PAUSE_REQUESTED', pause),
    takeEvery('RESUME_REQUESTED', resume),
    takeEvery('TOGGLE_REQUESTED', toggle),
    takeEvery('ADD_TO_PLAYLIST_REQUESTED', addToPlayList),
    takeLatest('STATE_CHANGE_REQUESTED', changeState),
  ];
}

export default mainSaga;
