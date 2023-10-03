import React, { Component, createContext, useContext, useState } from 'react';
import { match } from 'path-to-regexp';
import page from "../../base/page";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const context = createContext();
let c = 0;

export const Router = (props) => {
    const { children, transition, transitionPrefix } = props;

    const [ pagePathname ] = page.use("pathname");
    const currentPath = pagePathname.get();
    let currentRoute = null;
    let params = {};

    const routes = Array.isArray(children) ? children : [children];
    for (const route of routes) {
        if (!React.isValidElement(route)) { continue; }
        const { path, exact } = route.props;
        const matcher = match(path || "(.*)", {
            end:exact,
            decode: decodeURIComponent,
        });
        const matched = matcher(currentPath);
        if (!matched) { continue; }
        params = matched.params;
        currentRoute = route;
        break;
    }

    return (
        <context.Provider value={{ params }}>
            <TransitionGroup {...Component.jet.buildProps(props, {}, ["children", "transition", "transitionPrefix"])}>
                <CSSTransition key={c++} classNames={transitionPrefix} timeout={transition} appear>
                    {currentRoute}
                </CSSTransition>
            </TransitionGroup>
        </context.Provider>
    )
}

export const useRoute = _=>{
    const route = useContext(context);
    return useState(_=>route)[0];
}