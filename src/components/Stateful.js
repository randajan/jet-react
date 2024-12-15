import React from 'react';

import jet from "@randajan/jet-core";
import RunPool from "@randajan/jet-core/runpool";

import { Flagable } from "./Flagable";

export class Stateful extends Flagable {

  static customProps = [
    ...Flagable.customProps,
    "onChange"
  ];

  static stateProps = [

  ];

  constructor(props) {
    super(props);

    const propState = this.fetchPropState(props);
    this.state = this.validateState(propState, propState, new Set());
  }

  componentDidUpdate(props) {
    const stateProps = {};
    let propsUpdated = false;

    for (const sp of this.self.stateProps) {
      if (this.props[sp] === props[sp]) {
        stateProps[sp] = this.state[sp];
      } else {
        stateProps[sp] = this.props[sp];
        propsUpdated = true;
      }
    }

    if (propsUpdated) {
      this.setState(this.fetchPropState(stateProps));
    } else {
      super.componentDidUpdate();
    }
  }

  fetchPropState(changes) {
    return {};
  }

  setState(state) {
    const { onChange } = this.props;
    const from = Object.jet.tap(this.state);
    const effect = new Set();
    const to = this.validateState(state, from, effect);
    const changes = jet.compare(from, to, true);
    if (changes.length) {
      super.setState(to, _=>{
        jet.run(onChange, this, changes);
        jet.run(effect);
      });
    }
    return changes;
  }

  reset() {
    return this.setState(this.fetchPropState(this.props));
  }

  validateState(to, from) { return jet.merge(from, to); }

}
