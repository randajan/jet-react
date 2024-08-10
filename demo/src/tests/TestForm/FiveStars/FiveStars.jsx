import React from 'react';

import jet from "@randajan/jet-react";

import "./FiveStars.scss";

import starPng from "./star.png";


const Star = ()=>{
  return <img src={starPng}/>;
}

export const FiveStars = (props)=>{
  const { } = props;

  return (
    <div className="FiveStars">
      <Star/><Star/><Star/><Star/><Star/>
    </div>
  );
}