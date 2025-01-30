import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { productListReducer, productReducer } from './Reducers/Product';
import { userLoginReducer, userRegisterReducer } from './Reducers/User';
import { cartReducer } from './Reducers/Cart';
import { userListReducer } from './Reducers/UsersList';
import { listOrdersReducer } from './Reducers/Orders';
import { productCreateReducer, productDeleteReducer, productUpdateReducer } from './Reducers/AdminProduct'

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
    userListReducer,
    listOrdersReducer,
    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);


export const persistor = persistStore(store);