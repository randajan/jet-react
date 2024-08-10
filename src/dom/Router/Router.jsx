import React from 'react';
import { match } from 'path-to-regexp';
import page from "../../base/page";
import { Hub } from '../Hub/Hub';

const formatRoute = (route)=>{
    if (!route) { return {}; }
    if (!React.isValidElement(route)) { return route; }
    return Object.jet.extract(route.props, ["path", "exact", "children"]);
}

export class Router extends Hub {
    constructor(routes) {
        super(
            (route, props)=>route.matcher(page.get("pathname")),
            (route, params)=>route.children || route.content,
            (route)=>{
                const { path, exact, children, content } = route = formatRoute(route);
                if (!(children || content)) { return; }
                route.matcher = match(path || "(.*)", {
                    end:exact,
                    decode: decodeURIComponent,
                });
                return route;
            }
        );

        this.addRoutes(routes);
    }

    Provider(props={}) {
        page.use("pathname");
        return super.Provider(props);
    }
}

export const createRouter = (...routes)=>new Router(routes);

export default createRouter;