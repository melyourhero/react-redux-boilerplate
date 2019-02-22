import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import debounce from 'lodash/debounce';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createRootReducerFactory from './reducers/rootReducer';

import { rootSaga } from './rootSaga';

import devToolsBlackList from './DevToolsBlackList';

const batchDebounce = debounce((notify) => notify(), 16);

export const history = createBrowserHistory();

export function configureStore() {
  const composeEnhancers = composeWithDevTools({
    predicate: (state, action) => {
      return !devToolsBlackList.some((blackType) => action.type === blackType);
    },
    actionSanitizer: (action) => {
      const type = action.type.toString();
      return {
        ...action,
        type,
      };
    },
  });
  const sagaMiddleware = createSagaMiddleware();
  const middleware = composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
    batchedSubscribe(batchDebounce),
  );
  const rootReducer = createRootReducerFactory(history);
  const store = createStore(rootReducer, middleware);
  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
