import React, { useState } from 'react';

import jet from "@randajan/jet-react";
import { Trigger } from "../../../../dist/dom/Trigger/Trigger";
import { Pane } from "../../../../dist/dom/Pane/Pane";


import "./TestPane.scss";



export const TestPane = (props)=>{
  const { } = props;
  const [ state, setState ] = useState(false);

  return (
    <div className="TestPane">
      <Trigger switch onTap={_=>setState(!state)} active={state}>Click me</Trigger>
      <Pane position="left" transition={{enter:100, exit:500, appear:100}} expand={state} appear>THIS IS LONG TEXT</Pane>
      <span>other text</span>
    </div>
  );
}
