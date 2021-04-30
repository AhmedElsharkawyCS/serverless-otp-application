import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducer from "./reducers";
export const store = createStore(reducer, composeWithDevTools());
