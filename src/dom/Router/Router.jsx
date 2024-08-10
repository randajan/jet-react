import React, { Component, createContext, useContext, useMemo, useState } from 'react';
import { match } from 'path-to-regexp';
import page from "../../base/page";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import "./Router.scss";

const _privates = new WeakMap();

const formatRoute = (route)=>{
    if (!route) { return {}; }
    if (!React.isValidElement(route)) { return route; }
    return Object.jet.extract(route.props, ["path", "exact", "children"]);
}


const formatMatchers = (routes, list=[])=>{

    for (let route of routes) {
        if (Array.isArray(route)) { formatMatchers(route, list); continue; }
        const { path, exact, children, content } = route = formatRoute(route);
        const c = children || content;
        if (!c) { continue; }
        const matcher = match(path || "(.*)", {
            end:exact,
            decode: decodeURIComponent,
        });
        list.push([matcher, c, Object.jet.exclude(route, ["children", "content"])]);
    }

    return list;
}

export const createRouter = (...routes)=>{
    let _c = 0;
    const def = {params:{}};
    const context = createContext(def);

    const Provider = (props)=>{
        const { children, transition, transitionPrefix } = props;
        const [ pagePathname ] = page.use("pathname");
        const currentPath = pagePathname.get();

        const matchers = useMemo(_=>formatMatchers([children, ...routes]), [children]);
        let routeContent = null;
        let routeDetail = def;

        for (const [ matcher, children, detail ] of matchers) {
            const matched = matcher(currentPath);
            if (!matched) { continue; }
            routeContent = children;
            routeDetail = {...detail, params:matched.params};
            break;
        }

        if (transition) {
            routeContent = (
                <TransitionGroup {...Component.jet.buildProps(props, {}, ["children", "transition", "transitionPrefix"])}>
                    <CSSTransition key={_c++} classNames={transitionPrefix} timeout={transition} appear >
                        {routeContent || <></>}
                    </CSSTransition>
                </TransitionGroup>
            )
        }
        
        return <context.Provider value={routeDetail} children={routeContent}/>;
    }

    Provider.useRoute = ()=>useContext(_privates.get(this).context);
    Provider.useParams = ()=>this.useRoute().params;

    return Provider;
}

export const Route = (props) => {
    return (
        <div className={ cn("Route", props.className) }>
            {props.children}
        </div>
    );
};

export default createRouter;