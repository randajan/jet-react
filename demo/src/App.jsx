import React, { Component } from "react";
import { useDrag, ReactComponent } from "../../dist/index.js";
import page from "../../dist/page.js";
import screen from "../../dist/screen.js";
import "./test.css";

import jet from "@randajan/jet-core";

const TestInject = (props) => {

    return ReactComponent.jet.inject(
      props.children, (ele, key, level)=>{
        return {children:key+":"+level, id:"li-"+key+"-"+level}
      },
      true, ["li"]
    );
  }

export default _=>{
    const searchChanges = page.use("search");
    const screenChanges = screen.use("300h");

    const [ ref, move ] = useDrag((bound)=>{
        bound.relX = Number.jet.snap(bound.relX, .025, 0.25, .75);
        bound.relY = Number.jet.snap(bound.relY, .025, 0.25, .75);
    }, {
        initX:page.get("search.x"),
        initY:page.get("search.y"),
        up:.5,
        left:.05,
        right:.05,
        down:.01,
        autoReset:true,
        appendState:true
    });

    

    return (
        <div className="App" data-flags={ReactComponent.jet.flags(_=>_, "a")}>
            <div className="wrap">
                <div id="test" ref={ref}/>
            </div>
            <div>{ReactComponent.jet.flags(screen.get(), "A").join(" | ")}</div>
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
                <input onChange={ev=>page.set("search.x", ev.target.value)} defaultValue={page.get("search.x") || 0}/>
                <input onChange={ev=>page.set("search.y", ev.target.value)} defaultValue={page.get("search.y") || 0}/>
            </div>

        </div>
    )
}