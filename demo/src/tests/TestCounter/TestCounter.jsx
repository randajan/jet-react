import React, { useEffect, useState } from 'react';

import jet from "@randajan/jet-react";

import "./TestCounter.scss";
import { Counter } from "../../../../dist/dom/Counter/Counter";
import "../../../../dist/dom/Counter/Counter.css";



export const TestCounter = (props)=>{
  const { } = props;

  const [ num, setNum ] = useState(110);
  
  window.setNum = setNum;

  return (
    <div className="TestCounter">
      <Counter duration={1000}>{num}</Counter>
    </div>
  );
}
