import React from 'react';

import jet, { usePromise } from "@randajan/jet-react";
import { Field } from "../../../../dist/dom/form";

import "./TestUsePromise.scss";


export const TestUsePromise = (props)=>{
  const { } = props;
  const { value, status, run } = usePromise("blank", data=>{
    return new Promise((res, rej)=>{
        setTimeout(_=>{
          if (Boolean.jet.rnd()) { res(data); }
          else { rej("error"); }
        }, 3000);
    });
  })

  return (
    <div className="TestUsePromise">
      <div>{status}</div>
      <div>{value}</div>
      <Field onOutput={field=>{ run(field.getOutput()); }}></Field>
    </div>
  );
}
