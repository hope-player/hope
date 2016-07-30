import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './containers/App';

import reducer from './reducers/root';
import saga from './sagas/sagas';

import { initLibrary } from './actions/LibraryActions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);
store.dispatch(initLibrary());

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
  , document.getElementById('container'));
