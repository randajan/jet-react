import React, { Component, createContext, useContext, useMemo, useRef } from 'react';
import { match } from 'path-to-regexp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import jet from "../../index";

import Plex from '@randajan/jet-core/plex';

const _privates = new WeakMap();

const setCurrent = ()=>({key:0});

export class Hub extends Plex {
  constructor({
    routeMatch,
    routeRender,
    routeFormat,
    routeTransition
  }) {
    super(props => this.Provider(props));

    const _p = {
      routeMatch,
      routeRender,
      routeFormat,
      routeTransition,
      routes: [],
      context: createContext({ params: {} }),
    }

    _privates.set(this, _p);

    this.Provider = this.Provider.bind(this);

  }

  addRoute(...route) {
    return this.addRoutes(route);
  }

  addRoutes(routes) {
    const _p = _privates.get(this);

    for (const route of routes) {
      if (Array.isArray(route)) { this.addRoutes(route); continue; }
      const formatedRoute = _p.routeFormat ? _p.routeFormat(route) : route;
      if (!formatedRoute) { return; }
      formatedRoute.key = _p.routes.push(formatedRoute);
    }

    return this;
  }
  
  mapRoutes(mapper) {
    const _p = _privates.get(this);
    return _p.routes.map((route, key)=>mapper({...route}, key));
  }

  matchRoute(match) {
    const _p = _privates.get(this);
    let matchedRoute, matchedParams;

    for (const route of _p.routes) {
      const matched = _p.routeMatch(route, match);
      if (!matched) { continue; }
      if (typeof matched === "object") { matchedParams = matched; }
      matchedRoute = route;
      break;
    }

    if (matchedRoute) { return {...matchedRoute, match, params:matchedParams||{}}; }
  }

  useRoute() {
    return useContext(_privates.get(this).context);
  }

  useParams() {
    return this.useRoute()?.params;
  }

  Provider(props) {
    const _p = _privates.get(this);
    const { transition, transitionPrefix, match } = props;

    const route = this.matchRoute(match);
    const content = <_p.context.Provider value={route} children={_p.routeRender(route, match)} />;
    
    if (!transition) { return content; }

    const _c = useMemo(setCurrent, []);
    const ref = useMemo(_=>({current:undefined}), [content]);

    const trs = _p.routeTransition(route, _c.route);
    if (trs) { _c.key++; }
    if (route !== _c.route) { _c.route = route; }

    return (
      <TransitionGroup {...Object.jet.exclude(props, ["transition", "transitionPrefix", "match"])}>
        <CSSTransition nodeRef={ref} key={_c.key} classNames={transitionPrefix} timeout={transition} appear >
          {<div ref={ref} data-transition={trs}>{content}</div>}
        </CSSTransition>
      </TransitionGroup>
    );
    
  }

}

export const createHub = (routeMatch, routeRender, routeFormat) => new Hub(routeMatch, routeRender, routeFormat);

export default createHub;