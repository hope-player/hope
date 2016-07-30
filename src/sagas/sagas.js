import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import Api from '../api/api';

function* addSource(action) {
  try {
    const library = yield call(Api.getSource, action.source);
    yield put({
      type: 'SOURCE_FETCH_SUCCEEDED',
      library: library.data,
      source: action.source,
    });
  } catch (e) {
    yield put({ type: 'SOURCE_FETCH_FAILED', message: e.message });
  }
}

function* initLibrary() {
  try {
    const sources = yield call(Api.getAvailableSources);
    for (const source of sources.data) {
      yield put({ type: 'SOURCE_FETCH_REQUESTED', source });
    }
    yield put({ type: 'LIBRARY_INIT_SUCCEEDED' });
  } catch (e) {
    yield put({ type: 'LIBRARY_INIT_FAILED', message: e.message });
  }
}

function* play(action) {
  try {
    yield call(Api.play, action.track.get('source'), action.track.get('id'));
    yield put({ type: 'PLAY_SUCCEEDED', index: action.index });
    yield put({ type: 'CURRENT_TRACK_UPDATE', track: action.track });
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
    yield call(Api[method]);
    yield put({ type: success });
  } catch (e) {
    yield put({ type: failure });
  }
}

function* pause() {
  yield resumePause('pause', 'PAUSE_SUCCEEDED', 'PAUSE_FAILED');
}

function* resume() {
  yield resumePause('resume', 'RESUME_SUCCEEDED', 'RESUME_FAILED');
}

function* mainSaga() {
  yield [
    takeEvery('LIBRARY_INIT_REQUESTED', initLibrary),
    takeEvery('SOURCE_FETCH_REQUESTED', addSource),
    takeEvery('PLAY_REQUESTED', play),
    takeEvery('PLAY_RELATIVE', playRelative),
    takeEvery('PAUSE_REQUESTED', pause),
    takeEvery('RESUME_REQUESTED', resume),
  ];
}

export default mainSaga;
