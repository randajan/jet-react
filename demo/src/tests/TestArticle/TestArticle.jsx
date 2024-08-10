import React from 'react';

import Article from "../../../../dist/dom/Article/Article";

import "./TestArticle.scss";


export const TestArticle = (props)=>{
  const { } = props;

  return (
    <Article src={"# AAAA <br> ![hello](https://upload.wikimedia.org/wikipedia/commons/5/5a/Wikipedia%27s_W.svg)"}/>
  );
}
