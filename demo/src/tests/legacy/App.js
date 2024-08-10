import React, { Component, useEffect, useRef, useState } from 'react'

import jet from "@randajan/jet-core";
import ModalProvider, { Table, Menu, PopUp, Bar, Form, Range, Slider, Switch, Button, Field, cssTranslate, Block, Caption, Article, Pane } from "../../dist/index.js";
import "../../dist/index.css";
import starPng from "./star.png";

function TestForm2() {
  //const onInput = useForceRender();
  const ref = useRef();
  const form = ref.current;
  const input = form ? jet.map.of(form.getInput(), jet.num.to) : {};

  return (
    <Form { ...{ref }}>
      <div className="flex scope">
        <h3>Rozsah vašeho IT systému</h3>
        <Switch name="is_detailed"/>
        <Field name="c_user" type="number"/>
        <Field name="c_server" type="number"/>
        {/* <Pane key={10} expand={!!input.is_detailed} transition={20000}>
          <Field name="c_pc" type="number"/>
          <Field name="c_netgear" type="number"/>
          <Field name="c_gear" type="number"/>
        </Pane> */}

      </div>
    </Form>
  )
}


function RndField() {
  const [rndval, setRndval] = useState("test");

  useEffect(_=>{ let id = setInterval(_=>setRndval(String.jet.rnd(5)), 5000); return _=>clearInterval(id); });
  console.log(rndval);
  return <Field name={"test"} rawput={rndval} autoSize/>;
}

function App() {
  const [sw, setSw] = useState(undefined);
  const [isExpand, setExpand] = useState(true);


  return (
    <ModalProvider className="App" caption="H1">
      {/* <RndField/> */}
      <Button onSubmit={_=>setSw(!sw)}>Switch menu</Button>
      <Slider onInput={console.log}/>
      <Block caption="WTF"><Block caption="WTF2">Hello</Block></Block>
      <Button onSubmit={()=>{ setExpand(!isExpand); }}>Show me the funny</Button>
      <Pane expand={isExpand} transition={2000} position={"top"} unmountOnExit>
        TEST is BEST
      </Pane>
      <Menu trigger={"Menu"} transition={600} noblur>
        <div>Cool</div>
        <div>I want it</div>
        <Menu trigger={"SubMenu"} noblur transition={600}>
          <div>Cool</div>
          <div>I want it</div>
          <div>Oh my gosh</div>
          <div>I will pay you money</div>
        </Menu>
        <div>Oh my gosh</div>
        <div>I will pay you money</div>
      </Menu>
      aaaaa
    </ModalProvider>
  );
}

export default App
