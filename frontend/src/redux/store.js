import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(Store);