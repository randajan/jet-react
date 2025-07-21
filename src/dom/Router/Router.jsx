import React from 'react';
import jet from "../../index";

import { match } from 'path-to-regexp';
import page from "../../base/page";
import { Hub } from '../Hub/Hub';

const formatRoute = (route)=>{
    if (!route) { return {}; }
    if (!React.isValidElement(route)) { return route; }
    return Object.jet.extract(route.props, ["path", "exact", "children"]);
}

const defaultTransition = ((t, f)=>t?.key !== f?.key);

export class Router extends Hub {
    constructor(routes) {
        super({
            routeMatch:(route, match)=>route.matcher(match).params,
            routeRender:route=>route?.children || route?.content,
            routeFormat:route=>{
                const { path, exact, children, content, transition } = route = formatRoute(route);
                if (!(children || content)) {
                    console.warn(`Route path '${path}' require content or children`);
                    return;
                }

                if (route.transition != null) {
                    route.transition = jet.isRunnable(transition) ? transition : _=>transition;
                }
                
                route.matcher = match(path || "(.*)", {
                    end:exact,
                    decode: decodeURIComponent,
                });

                return route;
            },
            routeTransition:(routeTo, routeFrom)=>{
                const tr = routeTo?.transition || defaultTransition; 
                return tr(routeTo, routeFrom);
            }
        });

        this.addRoutes(routes);
    }

    Provider(props={}) {
        const [pathname] = page.use("pathname");
        return super.Provider({...props, match:pathname.get()});
    }
}

export const createRouter = (...routes)=>new Router(routes);

export default createRouter;