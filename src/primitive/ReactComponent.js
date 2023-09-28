
import React, { Component } from "react";

import jet, { Pool } from "@randajan/jet-core";

import { useForceRender } from "../hooks/useForceRender.js";
import { useFocus } from "../hooks/useFocus.js";
import { useDrift, useDrag, useSwipe } from "../hooks/useDrift.js";

const inject = (rEle, injection, deep, filter) => {
    const level = Number.jet.tap(deep);

    return React.Children.map(rEle, (r, key) => {
        if (!React.isValidElement(r)) { return r; }

        const include = (!filter || filter.includes(r.type));
        const injects = Object.jet.to(include ? injection : null, r, key, level);
        const children = deep ? inject(injects.children || r.props.children, injection, level + 1, filter) : null;
        if (children) { injects.children = children; }
        return jet.isFull(injects) ? React.cloneElement(r, injects) : r;
    });
}

const buildProps = (input, include = {}, exclude = [], force = false) => {
    const pass = { ...input };
    for (const e of exclude) { delete pass[e]; }
    for (let i in include) {
        if (include[i] !== undefined) { pass[i] = include[i]; }
        else if (force) { delete pass[i]; }
    }
    return pass;
}


export default jet.define("ReactComponent", Component, {
    to: x => x.render(),
    extendConstructor: {
        useForceRender,
        useFocus,
        useDrift,
        useDrag,
        useSwipe,
        flags: (flags, ...args) => {
            const result = new Set();

            jet.forEach(flags, (flag, key) => {
                flag = String.jet.to(flag, ...args);
                if (!flag || flag === "false") { return; }
                else if (flag === "true") { result.add(key); }
                else { result.add(flag); }
            }, true);

            return new Pool(...result);

        },
        inject,
        buildProps
    }
});