
import React from "react";
import { useDrag } from "../../../../dist/index.js";
import page from "../../../../dist/base/page";
import Link from "../../../../dist/dom/Link/Link";

import "./Dragable.scss";

export const Dragable = (props)=>{

    const [ pageSearch, searchChanges ] = page.use("search");

    const [ ref, move ] = useDrag((bound, id)=>{
        //bound.relX = Number.jet.snap(bound.relX, .025, 0.25, 1);
        //if (bound.dir === "up") { bound.relY = Number.jet.snap(bound.relY, .1, 0.25, .75);}
        if (bound.state === "start" && bound.event?.button !== 0) { bound.stop(); }
        if (bound.state === "start" && bound.event.target !== bound.target) { bound.stop(); }
        if (bound.dist > 300) { bound.stop(); }
    }, {
        initX:pageSearch.get("x"),
        initY:pageSearch.get("y"),
        up:.5,
        left:.005,
        right:.005,
        down:.005,
        autoReset:true,
        appendState:true
    });


    return (
        <div className="Dragable">
            <Link to="?x=.5&y=.5">TO MIDDLE</Link>
            <div style={{visibility:move ? "hidden" : "visible"}}>
                <input onChange={ev=>page.set("search.x", ev.target.value)} value={page.get("search.x") || 0}/>
                <input onChange={ev=>page.set("search.y", ev.target.value)} value={page.get("search.y") || 0}/>
            </div>
            <div className="board">
                <div id="circle" ref={ref}><span>p</span></div>
            </div>
        </div>

    )
}