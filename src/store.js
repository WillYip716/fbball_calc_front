import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './redux/rootreducer';
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const middleware = [thunk];

const persistConfig = { // configuration object for redux-persist
   key: 'rootv2',
   storage, // define which storage to use
}
const persistedReducer = persistReducer(persistConfig, rootReducer)



const store = createStore(
   persistedReducer,
   {},
   compose(
      applyMiddleware(...middleware),
      )
);

const  persistor = persistStore(store);
//persistor.purge()
export {store, persistor};
