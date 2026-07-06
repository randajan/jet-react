import React from 'react';

import jet from "@randajan/jet-react";

import "./TestPops.scss";

import { usePop, usePopSelf } from "../../../../dist/dom/Modal";
import "../../../../dist/dom/Modal/index.css";

const Test2 = ()=>{
  const popAbove = usePopSelf();
  return <div onClick={_=>popAbove?.down()}>CLOSE ME</div>
}

export const TestPops = (props)=>{
  const { } = props;
  const pop = usePop();
  const pop2 = usePop();

  return (
    <div className="TestPops">
      <a onClick={_=>pop.up(<div onClick={_=>pop2.up(<Test2/>)}>TEST</div>)}>Click me</a>
    </div>
  );
}
