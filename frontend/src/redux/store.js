import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authslice.js"
import jobsSlice from "./jobslice.js"
import { combineReducers } from "@reduxjs/toolkit";
import jobReducer from "./jobslice.js"

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from "redux-persist/lib/storage";


const persistStorage = storage?.default ?? storage;
import companyReducer from "./Companyslice.js"
import applicationslicereducer from "./Applicationslice.js"


// debug removed


const persistConfig = {
  key: 'root',
  version: 1,
  storage: persistStorage,
}

const rootReducer = combineReducers({

  auth: authSliceReducer,
  jobs: jobsSlice,
  job:jobReducer,
  company:companyReducer,
  application:applicationslicereducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),



 
});

export default store;