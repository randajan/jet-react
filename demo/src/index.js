import jet from "@randajan/jet-core";
import React from "react";
import { createRoot } from 'react-dom/client';
import page from "../../dist/page";
import screen from "../../dist/screen";

import App from './App';
import "./index.css";

createRoot(Element.jet.find("#root")).render(<App />);

window.jet = jet;

window.basePage = page;
window.baseScreen = page;

page.debug = true;
screen.debug = true;



