import React from 'react';

import "./Pop.scss";

import { cn } from '../../../tools/css';
import { solid } from '@randajan/props';
import { Flagable } from '../../../components/Flagable';



export class Pop extends Flagable {

  static className = "Pop";

  static bindMethods = ["down"];

  static customProps = [
    ...Flagable.customProps,
    "ctrl", "lock", "closeButton", "closeOnBlur", "up", "onUp", "onDown"
  ];

  static defaultFlags = {
    ...Flagable.defaultFlags,
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

  render() {
    const { children, lock, closeButton } = this.props;

    return (
      <div {...this.fetchProps()}>
        <nav className={cn("nav")}>
          <div className={cn("close")} onClick={lock ? null : this.down}>{closeButton}</div>
        </nav>
        <div className={cn("content")}>
          {children}
        </div>
        <div className={cn("mist")} />
      </div>
    )
  }

}

export default Pop;
