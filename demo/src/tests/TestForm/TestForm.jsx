import React, { Component, useEffect, useRef, useState } from 'react'

import jet from "@randajan/jet-core";
import { Bar, Form, Range, Slider, Switch, Button, Field } from "../../../../dist/dom/Form";

import { FiveStars } from "./FiveStars/FiveStars";

import "./TestForm.scss";


export const TestForm = (props)=>{
  const { } = props;

  return (
    <Form
      className="TestForm"
      flags={{focus:p=>p.getFocus()}}
      rawput={{ fullname:"Adam", age:0, gender:false }}
      output={{ fullname:"Boris", age:30, gender:false }}
      labels={{ fullname:"Name", age:"Age", gender:"Gender", bio:"Bio" }}
      onOutput={(form)=>{console.log("form_output", form.getOutput())}}
      onInput={(form)=>{console.log("form_input", form.getInput())}}
      onChange={(...args)=>{console.log("form_change", ...args);}}
      onSubmit={(form)=>{ console.log("SUBMIT"); }}
    >
      <Field input={"Denis"} name="fullname" maxLength={15} onInput={console.log}/>
      <Field input={100} name="agen" type="number" onInput={console.log} focus step={5} min={10} max={150}/>
      <Range input={100} name="ager" step={1} from={0} to={100} marker={<FiveStars/>}/>
      <Switch name="gender" onOutput={(s,v)=>console.log("output", v)} onInput={(s,v)=>console.log("input", v)}/>
      <Field name="bio" maxLength={255} type="textarea" autoSize/>
      <div>
        <Button type="reset">To Default</Button>
        <Button type="reject">Undo changes</Button>
        <Button type="submit">Submit</Button>
      </div>
    

    </Form>

  )
}
