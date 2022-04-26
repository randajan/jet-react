import React, { Component } from "react";
import { page, useDrag, ReactComponent } from "../../dist/index.js";
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
        <div className="App" data-flags={ReactComponent.jet.flags({test:true})}>
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
            <div className="wrap">
                <div id="test" ref={ref}>{searchChanges().join(" | ")}</div>
            </div>
        </div>
    )
}