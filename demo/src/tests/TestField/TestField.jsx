import React from 'react';

import jet from "@randajan/jet-react";

import "./TestField.scss";
import { Field } from '../../../../dist/dom/Form';


export const TestField = (props)=>{
  const { } = props;

  return (
    <div className="TestField">
      <Field onInput={field=>{
        console.log("eyeOnInput", field.state.input);
      }}/>
    </div>
  );
}
