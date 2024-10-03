import React, { useEffect } from 'react';

import jet, { useForceRender } from "@randajan/jet-react";

import "./TestUseForceRender.scss";


export const TestUseForceRender = (props)=>{
  const { } = props;
  const refresh = useForceRender();

  useEffect(_=>{
    window.forceRender = refresh;
    return _=>{
      delete window.forceRender;
    }
  }, []);
  
  

  console.log("REFRESHED");

  return (
    <div className="TestUseForceRender">

    </div>
  );
}
