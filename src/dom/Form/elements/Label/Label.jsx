import React from 'react';
import jet from "../../../../index";

import "./Label.scss";
import { cn } from '../../../../tools/css';


//LABEL

export const Label = props=>{
  const { className, children, name } = props;

  if (!children) { return null; }
  
  return (
    <label className={cn("Label", className)} htmlFor={name}>
      {children}
    </label>
  )
}