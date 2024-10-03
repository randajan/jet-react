import React from 'react';

import jet from "@randajan/jet-react";

import "./TestUseStateSafe.scss";
import { useStateSafe } from '../../../../dist';


export const TestUseStateSafe = (props)=>{
  const { } = props;
  const [state, setState] = useStateSafe();
  
  window.setState = setState;

  return (
    <div className="TestUseStateSafe">
      {state}
    </div>
  );
}
