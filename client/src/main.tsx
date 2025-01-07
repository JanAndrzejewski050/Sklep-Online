import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
// @ts-ignore
import {store, persistor} from "./Redux/store"
import { Provider } from "react-redux";
//@ts-ignore
import { PersistGate } from "redux-persist/integration/react";
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <h1>hello</h1> */}
    </PersistGate>
  </Provider>
);