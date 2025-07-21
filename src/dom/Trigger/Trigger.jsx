import React from 'react';
import PropTypes from 'prop-types';
import jet from "../../index";

import { Flagable } from "../../components/Flagable";

import "./Trigger.scss";


export class Trigger extends Flagable {

  static className = "Trigger";

  static bindMethods = [
    ...Flagable.bindMethods,
    "handleClick"
  ];

  static customProps = [
    ...Flagable.customProps,
    "onTap", "lock", "active", "switch"
  ];

  static defaultFlags = {
    active: p => p.props.active,
    lock: p => p.props.lock,
    switch: p => p.props.switch
  }

  static propTypes = {
    ...Flagable.propTypes,
    onTap: PropTypes.func,
  }

  handleClick(ev) {
    const { lock, active, onTap } = this.props;
    const sw = this.props.switch;
    if (lock || (!sw && active)) { return; }
    jet.run(onTap, sw ? !active : true);
    ev?.preventDefault();
  }

  fetchProps() {
    return {
      ...super.fetchProps(),
      onClick: this.handleClick,
    };
  }

  render() {
    return <div {...this.fetchProps()} />;
  }
}


export default Trigger;