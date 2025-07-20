import React from 'react';
import jet from "../../index";

import "./Tile.scss";

import { Block } from '../Block/Block';
import { Img } from '../Img/Img';
import { Caption } from '../Caption/Caption';
import { cn } from '../../tools/css';


export const Tile = (props)=>{
    const { src, caption, children, className, tagName } = props
  
    return (
      <Block {...props} src={null} caption={null} className={cn("Tile", className)} tagName={tagName}>
        <Img src={src}/>
        <Caption>{caption}</Caption>
        {children}
      </Block>
    )
}

export default Tile;