import React, { Component } from 'react';
import jet from "../../index";

import page from "../../base/page.js";
import { cn } from '../../tools/css.js';

import "./Link.scss";

const _excludeProps = ["to", "type", "target", "telPrefix"];

export const Link = (props)=>{
    page.use();

    const { target, onClick } = props;
    const current = page.get("href");

    const url = new URL(props.to || props.href, current);
    const isLocal = page.is("origin", url.origin);
    const isHard = target || !isLocal;
    const isCurrent = !isHard && url.href === current;

    const passProps = {
        className:cn("Link", props.className),
        href:isLocal ? url.href.slice(url.origin.length) : url.href,
        "data-flags":jet.melt([isHard ? "hard" : "soft", isCurrent ? "current" : ""], " ")
    }

    if (isHard) {
        passProps.rel = "noreferrer noopener";
        passProps.target = (target == null || target === true) ? "_blank" : target === false ? "_self" : target;
    }
    else{
        passProps.onClick = ev=>{
            ev?.preventDefault();
            if (isCurrent) { return; }
            if (jet.isRunnable(onClick)) { onClick(ev); };
            page.set({ pathname:url.pathname, search:url.search, hash:url.hash });
        };
    }

    return <a {...Component.jet.buildProps(props, passProps, _excludeProps)}/>
}

export const LinkTel = (props)=>{
    const prefix = props.telPrefix;
    const raw = String.jet.to(props.to || props.href || props.children);

    const simple = raw.replace(/[\s\n\r]+/g, "").replace(/^00/, "+");

    const passProps = {
        className:jet.melt(["Link", props.className], " "),
        "data-flags":"tel",
        href:"tel:" + (simple.startsWith("+") ? simple : (prefix || "+420") + simple),
        rel:"noreferrer noopener"
    }

    return <a {...Component.jet.buildProps(props, passProps, _excludeProps)}/>
}

export const LinkMail = (props)=>{
    const raw = String.jet.to(props.to || props.href || props.children);
    const simple = raw.replace(/[\s\n\r]+/g, "");

    const passProps = {
        className:jet.melt(["Link", props.className], " "),
        "data-flags":"mail",
        href:"mailto:"+String.jet.delone(simple),
        rel:"noreferrer noopener"
    }

    return <a {...Component.jet.buildProps(props, passProps, _excludeProps)}/>
}


export default Link;