import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App.tsx'
// @ts-ignore
import {store, persistor} from "./Redux/store.js"
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