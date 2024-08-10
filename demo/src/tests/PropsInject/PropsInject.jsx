import React, { Component } from "react";
import { ReactComponent } from "../../../../dist/index.js";

const Inject = (props) => {
    return ReactComponent.jet.inject(
        props.children, (ele, key, level)=>{
        return {children:key+":"+level, id:"li-"+key+"-"+level}
        },
        true, ["li"]
    );
};


export const PropsInject = ()=>{
    return (
        <Inject>
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
        </Inject>
    );
}