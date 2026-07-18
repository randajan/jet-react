import React, { Component, useEffect, useRef } from 'react';
import jet from "../../index";

import page from '../../base/page';
import { usePromise } from '../../hooks/usePromise';

import { cn } from "../../tools/css";

import "./Img.scss";

const _rgExt = /\.[^\.\/\\]*$/;
const _rgSvg = /<svg[^>]*>[\s\S]*<\/svg>/;
const _cache = {};

const isAllowedSvg = (src, allowCors=false)=>{
    const origin = page.get("origin");
    const url = new URL(src, origin);

    if (!allowCors && origin !== url.origin) { return false; }

    const ext = (url?.pathname?.match(_rgExt) || [])[0];
    return ext === ".svg";
}

const isSvgStr = (str)=>typeof str === "string" && _rgSvg.test(str);
const asSvgStr = (str, src)=>{
    if (isSvgStr(str)) { return str; }
    throw new Error(`Invalid SVG at '${src}'`);
}

const fetchSVG = async (src, normalize, allowCors)=>{
    const resp = await fetch(src, allowCors ? {} : { mode:"no-cors" });
    const data = await resp.text();

    const pure = await normalize(asSvgStr(data, src)); //PURIFY

    return asSvgStr(pure, src);
}

const filterProps = (props, exclude=[])=>{
    return Object.jet.exclude(props, ["forceSvg", "allowCors", "normalizeSvg", ...exclude]);
}


const Svg = (props)=>{
    const { src, allowCors, normalizeSvg } = props;
    const body = useRef();

    const { result:svg, status } = usePromise(null, async _=>{
        return _cache[src] || (_cache[src] = fetchSVG(src, normalizeSvg, allowCors));
    }, [src, normalizeSvg, allowCors]);    

    useEffect(_=>{
        if (body.current) { body.current.innerHTML = svg; }
    }, [body.current, svg]);

    if (status === "error") { return <img {...filterProps(props)}/>; }

    return <span ref={body} {...filterProps(props, ["src", "alt"])} data-status={status}/>;
}


export const Img = (props)=>{
    const { src, alt, forceSvg, normalizeSvg, allowCors } = props;

    const className = cn("Img", props.className);
    const title = String.jet.only(props.title, alt);

    const pass = { ...props, className, title };

    if (normalizeSvg && (forceSvg || isAllowedSvg(src, allowCors))) {
        return <Svg {...pass}/>; 
    }

    return <img {...filterProps(pass)}/>;
}

export default Img;

