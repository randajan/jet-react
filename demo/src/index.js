import jet from "@randajan/jet-core";
import { page, screen } from "../../dist/index.js"; 

window.jet = jet;
window.basePage = page;
window.baseScreen = screen;

let x;
page.watch("search", get=>{
    if (x) { x(); }
    x = Element.jet.find("#test").jet.drag((ev, data)=>{
        
    }, { initX:get("x"), initY:get("y"), autoReset:true, appendState:true });

}, true);

