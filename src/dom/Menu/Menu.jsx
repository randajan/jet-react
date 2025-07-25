import React, { useContext } from 'react';
import PropTypes from "prop-types";
import jet from "../../index";

import { Focusable } from "../../components/Focusable";

import { Trigger } from '../Trigger/Trigger';
import { Pane } from '../Pane/Pane';

import "./Menu.scss";

const context = React.createContext();;

export class Menu extends Focusable {

  static use() { return useContext(context); }

  static className = "Menu";

  static bindMethods = [
    ...Focusable.bindMethods,
    "setFocus"
  ];

  static customProps = [
    ...Focusable.customProps,
    "children", "flat", "noblur", "position", "transition", "trigger", "keepMounted", "appear",
  ];

  static defaultFlags = {
    ...Focusable.defaultFlags,
    flat: p => p.props.flat,
    noblur: p => p.props.noblur,
    position: p => p.props.position,
  }

  static propTypes = {
    ...Focusable.propTypes,
    appear:PropTypes.bool,
    flat: PropTypes.bool,
    keepMounted: PropTypes.bool
  }

  static defaultProps = {
    ...Focusable.defaultProps,
    "position": "top",
    "keepMounted": false
  }

  afterRender() {
    const { body, cleanUp, props:{ noblur }, state:{ focus } } = this;
    cleanUp.run();
    cleanUp.flush();
    if (!body || !focus || noblur) { return; }
    cleanUp.add(Element.jet.listen(document, "mouseup", ev => {
      const target = ev.target;
      const now = (body && (body === target || body.contains(target)));
      if (!focus !== !now) { this.setFocus(now); }
    }))
  }

  fetchTriggerProps() {
    const { state:{ focus }, props:{ trigger, noblur } } = this;

    return {
      ref: el => this.trigger = el,
      switch: true, active: focus,
      children: trigger,
      onTap: this.setFocus
    }
  }

  fetchPaneProps() {
    const { state:{ focus }, props:{ transition, position, children, keepMounted, appear  } } = this;

    return {
      ref: pane => this.pane = pane,
      keepMounted, expand: focus, appear, position, transition, children,
    }
  }

  render() {
    const { children, flat } = this.props;

    return (
      <context.Provider value={this}>
        <div {...this.fetchProps()}>
          {
            flat ? children :
              <React.Fragment>
                <Trigger {...this.fetchTriggerProps()} />
                <Pane {...this.fetchPaneProps()} />
              </React.Fragment>
          }
        </div>
      </context.Provider>
    )
  }
}

export default Menu;