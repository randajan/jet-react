import React, { Component } from 'react';
import jet from "../../index.js";

import page from "../../base/page";


export const Link = (props)=>{
    const { target, onClick } = props;
    const url = new URL(props.to || props.href, page.get("href"));
    const isLocal = page.is("origin", url.origin);
    const isHard = target || !isLocal;

    const passProps = {
        className:jet.melt(["Link", isHard ? "hard" : "soft", props.className], " "),
        href:isLocal ? url.href.slice(url.origin.length) : url.href,
    }

    if (isHard) {
        passProps.rel = "noreferrer noopener";
        passProps.target = (target == null || target === true) ? "_blank" : target === false ? "_self" : target;
    }
    else {
        passProps.onClick = ev=>{
            Event.jet.cut(ev, true);
            if (jet.isRunnable(onClick)) { onClick(ev); };
            page.set({ pathname:url.pathname, search:url.search, hash:url.hash });
        };
    }
    return <a {...Component.jet.buildProps(props, passProps, ["to"])}/>

}
