import React from 'react';

import jet, { usePromise } from "@randajan/jet-react";
import { Field } from "../../../../dist/dom/form";

import "./TestUsePromise.scss";


export const TestUsePromise = (props)=>{
  const { } = props;
  const { result, status, run } = usePromise("blank", data=>{
    return new Promise((res, rej)=>{
        setTimeout(_=>{
          if (data.startsWith("a")) { res(data); }
          else { rej("error"); }
        }, 1000);
    });
  })

  return (
    <div className="TestUsePromise">
      <div>{status}</div>
      <div>{result}</div>
      <Field onOutput={field=>{ run(field.getOutput()); }}></Field>
    </div>
  );
}
