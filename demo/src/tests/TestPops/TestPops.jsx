import React from 'react';

import jet from "@randajan/jet-react";

import "./TestPops.scss";

import { usePop } from "../../../../dist/dom/Modal";
import "../../../../dist/dom/Modal/index.css";


export const TestPops = (props)=>{
  const { } = props;
  const pop = usePop();
  const pop2 = usePop();

  return (
    <div className="TestPops">
      <a onClick={_=>pop.up(<div onClick={_=>pop2.up(<div>wtf</div>)}>TEST</div>)}>Click me</a>
    </div>
  );
}
