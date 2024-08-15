import React, { Component, createContext, useContext, useMemo } from 'react';
import { match } from 'path-to-regexp';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import jet from "../../index";

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
      if (!formatedRoute) { continue; }
      formatedRoute.uid = _p.routes.push(formatedRoute);
    }

    return this;
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

    const params = matchedParams || {};
    return matchedRoute ? {...matchedRoute, params} : {params};
  }

  useRoute() {
    return useContext(_privates.get(this).context);
  }

  useParams() {
    return this.useRoute().params;
  }

  Provider(props) {
    const _p = _privates.get(this);
    const _c = useMemo(setCurrent, []);
    const { transition, transitionPrefix, match } = props;

    const route = this.matchRoute(match);

    if (route.uid !== _c.uid) { _c.key++; _c.uid = route.uid; }
    let content = _p.routeRender(route);

    if (transition) {
      content = (
        <TransitionGroup {...Object.jet.exclude(this.props, ["transition", "transitionPrefix", "match"])}>
          <CSSTransition key={_c.key} classNames={transitionPrefix} timeout={transition} appear >
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