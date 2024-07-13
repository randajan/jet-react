import jet from "@randajan/jet-core";
import React from "react";
import { createRoot } from 'react-dom/client';
import page from "../../dist/base/page";
import screen from "../../dist/base/screen";
import store from "../../dist/base/store";

import App from './App';
import "./index.css";

createRoot(Element.jet.find("#root")).render(<App />);

window.jet = jet;

window.basePage = page;
window.baseScreen = screen;
window.baseStore = store;

page.debug = true;
screen.debug = true;
store.debug = true;



