import React, { Component } from "react";
import {  useDrag, ReactComponent, usePromise } from "../../dist/index.js";
import page from "../../dist/base/page";
import screen from "../../dist/base/screen";
import store from "../../dist/base/store.js";
import { Link } from "../../dist/elements/dom/index.js";
import "./test.css";

import jet from "@randajan/jet-core";

window.stores = store;

const TestInject = (props) => {

    return ReactComponent.jet.inject(
      props.children, (ele, key, level)=>{
        return {children:key+":"+level, id:"li-"+key+"-"+level}
      },
      true, ["li"]
    );
  }

export default _=>{
    const [ pageSearch, searchChanges ] = page.use("search");
    const [ screenSugar, screenChanges ] = screen.use();

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
        <div className="App" data-flags={ReactComponent.jet.flags(_=>_, "a")}>
            <div className="wrap">
                <div id="test" ref={ref}><span>p</span></div>
            </div>
            <div>{ReactComponent.jet.flags(screen.get(), "A").join(" | ")}</div>
            <Link to="#contact=up">TO MIDDLE</Link>
            <TestInject>
                <ul>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                </ul>
            </TestInject>
            <div style={{visibility:move ? "hidden" : "visible"}}>
                <input onChange={ev=>page.set("search.x", ev.target.value)} value={page.get("search.x") || 0}/>
                <input onChange={ev=>page.set("search.y", ev.target.value)} value={page.get("search.y") || 0}/>
            </div>

        </div>
    )
}