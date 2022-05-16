import jet from "@randajan/jet-core";
import { page, screen } from "../../dist/index.js"; 
import React from "react";
import { createRoot } from 'react-dom/client';

import App from './App';
import "./index.css";

createRoot(Element.jet.find("#root")).render(<App />);

window.jet = jet;
window.basePage = page.config(true);
window.baseScreen = screen.config({}, true);



