import React, { Component, createContext, useContext, useMemo } from 'react';
import { match } from 'path-to-regexp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Plex from '@randajan/jet-core/plex';

const _privates = new WeakMap();

export class Hub extends Plex {
  constructor(routeMatch, routeRender, routeFormat) {
    super(props => this.Provider(props));

    const _p = {
      key: 0,
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
    const _p = _privates.get(this);
    const { transition, transitionPrefix } = props;
    let matchedRoute;
    let matchedParams;

    for (const route of _p.routes) {
      const matched = _p.routeMatch(route, props);
      if (!matched) { continue; }
      if (typeof matched === "object") { matchedParams = matched; }
      matchedRoute = route;
      break;
    }

    const params = matchedParams || {};
    const route = matchedRoute ? {...matchedRoute, params} : {params};
    let content = matchedRoute ? _p.routeRender(matchedRoute, params) : null;

    if (transition) {
      content = (
        <TransitionGroup {...Component.jet.buildProps(props, {}, ["children", "transition", "transitionPrefix"])}>
          <CSSTransition key={_p.key++} classNames={transitionPrefix} timeout={transition} appear >
            {content || <></>}
          </CSSTransition>
        </TransitionGroup>
      )
    }

    return <_p.context.Provider value={route} children={content} />;
  }

}

export const createHub = (routeMatch, routeRender, routeFormat) => new Hub(routeMatch, routeRender, routeFormat);

export default createHub;