import React from 'react';

import Table from "../../../../dist/dom/Table/Table";
import "../../../../dist/dom/Table/Table.css";

import "./TestTable.scss";


export const TestTable = (props)=>{
  const { } = props;

  return (
    <Table className="TestTable" columns={["Baby", "Heyby"]} rows={[[1, "a"], [2, "b"]]}/>
  );
}
