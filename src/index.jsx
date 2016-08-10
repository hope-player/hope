import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './containers/App';

import reducer from './reducers/root';
import saga from './sagas/sagas';

import { initLibrary } from './actions/LibraryActions';
import { stateChanged } from './actions/PlayerActions';
import { playRelative } from './actions/PlayListActions';

import Library from './library/library';
import Player from './media/mpv';
// import './utils/setup-dev'; // setup devtools extensions

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(sagaMiddleware)
);
Library.connect(store);
Library.init();
sagaMiddleware.run(saga);
store.dispatch(initLibrary());
Player.addListener('pause', () => store.dispatch(stateChanged('paused')));
Player.addListener('unpause', () => store.dispatch(stateChanged('playing')));
Player.addListener('playback-restart', () => store.dispatch(stateChanged('playing')));
Player.addListener('idle', () => store.dispatch(playRelative(1)));

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
  , document.getElementById('container'));
