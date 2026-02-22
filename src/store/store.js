import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import {persistStore, persistReducer} from "redux-persist";


/*create persist config*/
const persistConfig = {
    key:"root",
    storage,
    // whitelist:['auth'] //persist only the auth data.
}

/*create persist reducer*/
const persistedReducer = persistReducer(persistConfig, authReducer)


/*configure store with the perisit reducer and middleware */
const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})

/*export store and persistedStore*/
export default store;
export const persistedStore = persistStore(store);