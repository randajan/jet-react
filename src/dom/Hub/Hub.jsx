import React, { Component, createContext, useContext, useMemo } from 'react';
import { match } from 'path-to-regexp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Plex from '@randajan/jet-core/plex';

const _privates = new WeakMap();

const setCurrent = ()=>({key:0});

export class Hub extends Plex {
  constructor(routeMatch, routeRender, routeFormat) {
    super(props => this.Provider(props));

    const _p = {
      routeMatch,
      routeRender,
      routeFormat,
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

      if (formatedRoute) { _p.routes.push(formatedRoute); }
    }

    return this;
  }

  useRoute() {
    return useContext(_privates.get(this).context);
  }

  useParams() {
    return this.useRoute().params;
  }

  Provider(props) {
    const _c = useMemo(setCurrent, []);
    const _p = _privates.get(this);
    const { id, className, transition, transitionPrefix } = props;
    let matchedRoute;
    let matchedParams;

    for (const route of _p.routes) {
      const matched = _p.routeMatch(route, props);
      if (!matched) { continue; }
      if (typeof matched === "object") { matchedParams = matched; }
      matchedRoute = route;
      break;
    }

    if (matchedRoute !== _c.route) { _c.key++; _c.route = matchedRoute; }
    const params = matchedParams || {};
    const details = matchedRoute ? {...matchedRoute, params} : {params};
    let content = matchedRoute ? _p.routeRender(matchedRoute, params) : null;

    if (transition) {
      content = (
        <TransitionGroup id={id} className={className}>
          <CSSTransition key={_c.key++} classNames={transitionPrefix} timeout={transition} appear >
            {content || <></>}
          </CSSTransition>
        </TransitionGroup>
      )
    }

    return <_p.context.Provider value={details} children={content} />;
  }

}

export const createHub = (routeMatch, routeRender, routeFormat) => new Hub(routeMatch, routeRender, routeFormat);

export default createHub;