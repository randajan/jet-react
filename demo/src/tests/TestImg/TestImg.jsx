import React from 'react';

import jet from "@randajan/jet-react";
import { Img } from "../../../../dist/dom/Img/Img";

import "./TestImg.scss";


export const TestImg = (props)=>{
  const { } = props;

  const normalizeSvg = (raw)=>{
    console.log(raw);
  };

  return (
    <div className="TestImg">
        <Img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/500px-Wikipedia-logo-v2.svg.png"/>
        <Img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg" allowCors normalizeSvg={normalizeSvg}/>
    </div>
  );
}
