
import React, { Component } from "react";

import jet from "@randajan/jet-core";


export default jet.define("ReactElement", Object, {
    is:x=>React.isValidElement(x),
    create:(x, ...args)=>React.createElement(x, ...args),
    copy:x=>React.cloneElement(x),
    extend:false,
    to:{
        Array:x=>React.Children.toArray(x)
    }
});