import React, { Component } from 'react';
import jet from "../../index";


import { Link } from "../Link/Link";
import { usePromise } from '../../hooks/usePromise';

import { compiler } from 'markdown-to-jsx';
import { Tile } from '../Tile/Tile';
import { Block } from '../Block/Block';
import { Img } from '../Img/Img';
import { Caption } from '../Caption/Caption';
import { cn } from '../../tools/css';

import "./Article.scss";

const _particles = {
    article: (alt, src, fetch)=><Article src={src} level={alt == null ? 1 : Number.jet.to(alt)} fetch={fetch} />,
    tile: (alt, src)=><Tile alt={null} caption={alt} src={src} />,
    img: (alt, src)=><Img alt={alt} src={src} noSVG/>
}

export const Article = (props) => {
    const { src, className, overrides, fetch, children, particles } = props;
    const { result:article, status } = usePromise("", !src ? null : _=>{
        return jet.isRunnable(fetch) ? fetch(src) : src;
    }, [fetch, src]);

    const options = {
        wrapper:null,
        forceWrapper:true,
        overrides: {
            a: Link,
            p: p=><div {...p}/>,
            img: p=>{
                const [kind, src] = String.jet.bite(p.src, "::");
                const prt = (particles ? particles[kind] : null) || _particles[kind];
                return prt ? prt(p.alt, src, fetch) : <Img {...p}/>;
            },
            h1: Caption.h1,
            h2: Caption.h2,
            h3: Caption.h3,
            h4: Caption.h4,
            h5: Caption.h5,
            h6: Caption.h6,
            ...overrides
        }
    }

    const pass = {
        className: cn("Article", className, String.jet.camelCase(String.jet.delone(src || ""))),
        children:compiler(String.jet.to(article) || String.jet.to(children), options),
        "data-status":status
    }

    return <Block.article {...Component.jet.buildProps(props, pass, ["src", "fetch", "particles", "overrides"])}/>;
}


export default Article;