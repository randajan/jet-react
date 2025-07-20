import React from 'react';

import jet from "@randajan/jet-react";

import "./TestUseRoute.scss";
import { useStateSafe } from '../../../../dist';
import { Router } from '../../Router';


export const TestUseRoute = (props)=>{
    const route = Router.useRoute();

  return (
    <div className="TestUseRoute">
      {JSON.stringify(route)}
    </div>
  );
}
