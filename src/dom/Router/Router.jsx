import React, { Component, createContext, useContext, useMemo, useState } from 'react';
import { list } from "@randajan/jet-core/eachSync";
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

const formatMatchers = routes=>{
    return list(routes, route=>{
        const { path, exact, children, content } = route = formatRoute(route);
        const c = children || content;
        if (!c) { return; }
        const matcher = match(path || "(.*)", {
            end:exact,
            decode: decodeURIComponent,
        });
        return [matcher, c, Object.jet.exclude(route, ["children", "content"])];
    }, { deep:true });
}

export const createRouter = (...routes)=>{
    let _c = 0;
    const def = {params:{}};
    const context = createContext(def);

    const Provider = (props)=>{
        const { children, transition, transitionPrefix } = props;
        const [ pagePathname ] = page.use("pathname");
        const currentPath = pagePathname.get();

        const matchers = useMemo(_=>formatMatchers([routes, children]), [children]);
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
                        {routeContent}
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

export default createRouter;