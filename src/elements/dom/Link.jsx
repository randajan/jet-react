import React, { Component } from 'react';
import jet from "../../index.js";

import page from "../../base/page";

const getPropsWeb = (props)=>{
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
            ev?.preventDefault();
            if (jet.isRunnable(onClick)) { onClick(ev); };
            page.set({ pathname:url.pathname, search:url.search, hash:url.hash });
        };
    }

    return passProps;
}

const getPropsTel = (props)=>{
    const prefix = props.telPrefix;
    const raw = String.jet.to(props.to || props.href || props.children);
    console.log(raw);
    const simple = raw.replace(/[\s\n\r]+/g, "").replace(/^00/, "+");

    return {
        className:jet.melt(["Link", "tel", props.className], " "),
        href:"tel:" + (simple.startsWith("+") ? simple : (prefix || "+420") + simple),
        rel:"noreferrer noopener"
    }
}

const getPropsMail = (props)=>{
    const raw = String.jet.to(props.to || props.href || props.children);
    const simple = raw.replace(/[\s\n\r]+/g, "");

    return {
        className:jet.melt(["Link", "mail", props.className], " "),
        href:"mailto:"+String.jet.delone(simple),
        rel:"noreferrer noopener"
    }
}


export const Link = (props)=>{
    const type = props.type;

    const passProps = type === "tel" ? getPropsTel(props) : type === "mail" ? getPropsMail(props) : getPropsWeb(props);

    return <a {...Component.jet.buildProps(props, passProps, ["to", "type", "target", "telPrefix"])}/>
}
