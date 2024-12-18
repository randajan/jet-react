import React, { Component } from 'react';
import jet from "../../../index";

import "./Pop.scss";

import { cn } from '../../../tools/css';
import { Block } from '../../Block/Block';
import { solid } from '@randajan/props';



export class Pop extends Block {

  static className = "Pop";

  static bindMethods = ["down"];

  static customProps = [
    ...Block.customProps,
    "ctrl", "lock", "closeButton", "closeOnBlur", "up", "onUp", "onDown"
  ];

  static defaultFlags = {
    ...Block.defaultFlags,
    top: p => p.ctrl.isTop(),
    lock: p => p.ctrl.state.lock
  }

  constructor(props) {
    super(props);

    solid(this, "ctrl", props.ctrl);
  }

  afterMount() {
    const { ctrl } = this;
    ctrl.current = this;
    this.cleanUp.add(_=>{ if (ctrl.current === this) { delete ctrl.current; } });
  }

  down(ev) {
    return this.ctrl.down(ev);
  }

  fetchChildren() {
    const { lock, closeButton } = this.props;

    return (
      <>
        <nav className={cn("nav")}>
          <div className={cn("close")} onClick={lock ? null : this.down}>{closeButton}</div>
        </nav>
        <div className={cn("content")}>
          {super.fetchChildren()}
        </div>
        <div className={cn("mist")} />
      </>
    )
  }

}

export default Pop;