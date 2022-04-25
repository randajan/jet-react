import React from "react";
import { page, useDrag } from "../../dist/index.js";
import "./test.css";

export default _=>{
    const searchChanges = page.use("search");

    const [ ref, move ] = useDrag((bound)=>{
        //console.log(bound.x, bound.y); 
        //bound.relX = Number.jet.snap(bound.relX, .02, 0.25, .75);
        //bound.relY = Number.jet.snap(bound.relY, .02, 0.25, .75);
    }, {
        initX:page.get("search.x"),
        initY:page.get("search.y"),
        up:.5,
        left:.1,
        right:.1,
        down:.05,
        autoReset:true,
        appendState:true
    });

    return (
        <div id="wrap">
            <div id="test" ref={ref}>{searchChanges().join(" | ")}</div>
        </div>
    )
}