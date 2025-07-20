import React, { useContext } from 'react';
import jet from "../../index";


import { Flagable } from '../../components/Flagable';
import { Caption } from '../Caption/Caption';

import "./Block.scss";

const context = React.createContext();

export class Block extends Flagable {

  static use() { return useContext(context) || 0; }

  static className = "Block";
  
  static customProps = [
      ...Flagable.customProps,
      "children", "caption", "level", "tagName"
  ];

  static defaultProps = {
    ...Flagable.defaultProps,
    tagName:"div",
    level:1
  }

  fetchChildren() {
    const { caption } = this.props;

    return (
      <>
        { caption ? <Caption>{caption}</Caption> : null }
        { this.props.children }
      </>
    )
  }

  render() {
    const { level, tagName } = this.props;

    const content = React.createElement(tagName, this.fetchProps(), this.fetchChildren());

    return (
      <context.Consumer>
        {lvl=>(
          <context.Provider value={lvl == null ? 0 : lvl+level}>
            {content}
          </context.Provider>
        )}
      </context.Consumer>
    )
  }
}

Block.div = props=><Block {...props} tagName={"div"}/>
Block.main = props=><Block {...props} tagName={"main"}/>
Block.section = props=><Block {...props} tagName={"section"}/>
Block.header = props=><Block {...props} tagName={"header"}/>
Block.footer = props=><Block {...props} tagName={"footer"}/>
Block.article = props=><Block {...props} tagName={"article"}/>

export default Block;