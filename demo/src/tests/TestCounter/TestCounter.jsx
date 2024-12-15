import React, { useEffect, useState } from 'react';

import jet from "@randajan/jet-react";

import "./TestCounter.scss";
import { Counter } from '../../../../src/dom/Counter/Counter';



export const TestCounter = (props)=>{
  const { } = props;

  const [ num, setNum ] = useState(11);
  
  window.setNum = setNum;

  return (
    <div className="TestCounter">
      <Counter duration={1000}>{num}</Counter>
    </div>
  );
}
