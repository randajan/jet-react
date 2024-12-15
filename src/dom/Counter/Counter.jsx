import React, { useEffect, useRef, useState } from 'react';

import "./Counter.scss";
import { cn } from '../../tools/css.js';
import { Dynamic } from '../../tools/Dynamic.js';

export const Digit = (props)=>{
  const { id, duration, order, number } = props;
  const ref = useRef();

  const [ dyn, setDyn ] = useState();

  const to = Math.floor(number/Math.pow(10, order))/10;

  useEffect(_=>{
    if (!ref.current) { return; }
    setDyn(new Dynamic(ref.current, { style:"top", init:0, start:0, end:-1000, unit:"%", duration }));
  }, [ref.current]);

  useEffect(_=>{
    if (dyn) { dyn.set(to); }
  }, [dyn, to]);

  return (
    <div className="Digit" title={id}>
      <div className="dummy">0</div>
      <div className="drum" ref={ref}>
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>0</div>
      </div>
    </div>
  );
}


export const Counter = (props)=>{
  const { id, title, className, children, duration=5000 } = props;
  const number = Number.jet.to(children);
  const digits = String(number).split("");

  const selfProps = {
    id, title,
    className:cn("Counter", className),
    children:digits.map((digit, key)=>{
      const id = Number(key);
      return <Digit {...{
        key, id, duration, number,
        order:digits.length-id-1,
      }}/>
    })
  }

  return (
    <div {...selfProps}/>
  );
}
