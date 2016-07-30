import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

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
    yield call(Api.play, action.source, action.id);
    yield put({ type: 'PLAY_SUCCEEDED', index: action.index });
  } catch (e) {
    yield put({ type: 'PLAY_FAILED', message: e.message });
  }
}

function* mainSaga() {
  yield [
    takeEvery('LIBRARY_INIT_REQUESTED', initLibrary),
    takeEvery('SOURCE_FETCH_REQUESTED', addSource),
    takeEvery('PLAY_REQUESTED', play),
  ];
}

export default mainSaga;
