import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';

//PENDING TO LEARN HOW TO USE

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage,
  transforms: [immutableTransform()]
};

const persistedReducer = persistReducer(persistConfig, {});
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export {store, persistor};
