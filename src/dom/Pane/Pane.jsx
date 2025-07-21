import React from 'react';
import PropTypes from 'prop-types';
import jet from "../../index";

import { CSSTransition } from "react-transition-group";

import { cn } from '../../tools/css';

import "./Pane.scss";
import { Flagable } from '../../components/Flagable';


const _sides = {
    "left": "width",
    "top": "height",
    "right": "width",
    "bottom": "height",
}


const paneReveal = (el, reset) => {
    if (!el) { return; }
    const s = el.style;
    if (reset) { s.display = null; }
    s.marginLeft = s.marginTop = s.marginRight = s.marginBottom = null;
}

const paneClose = (el, position) => {
    if (!el) { return; }
    const s = el.style;
    const b = Element.jet.bound(el);
    const pos = position.split("-");
    for (const p of pos) {
        s[`margin-${p}`] = `${-b[_sides[p]]}px`;
    }
}

const paneHide = (el, position) => {
    if (!el) { return; }
    const s = el.style;
    s.display = "none";
    const pos = position.split("-");
    for (const p of pos) {
        s[`margin-${p}`] = null;
    }
}

const parseTrs = trs => {
    if (typeof trs === "object") { return trs; }
    return { appear: trs, enter: trs, exit: trs }
}

export class Pane extends Flagable {

    static className = "Pane";

    static customProps = [
        ...Flagable.customProps,
        "position", "expand", "transition", "keepMounted", "appear"
    ];

    static propTypes = {
        ...Flagable.propTypes,
        position: PropTypes.oneOf(["top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"]),
        keepMounted: PropTypes.bool,
        expand:PropTypes.bool,
        appear:PropTypes.bool

    }

    static defaultProps = {
        ...Flagable.defaultProps,
        position: "top"
    }

    static defaultFlags = {
        ...Flagable.defaultFlags,
        position: p => p.props.position,
        expand: p => p.props.expand,
    }

    fetchPropsContent() {
        const { children } = this.props;

        return {
            ref: el => this.content = el,
            className: cn("content"),
            children
        }
    }

    fetchPropsTransition(children) {
        const { position, expand, transition, keepMounted, appear } = this.props;
        const timeout = parseTrs(transition);

        return {
            nodeRef: { current:this.content },
            in: expand,
            timeout,
            mountOnEnter: true,
            appear,
            unmountOnExit:!keepMounted,
            classNames: cn.transitions,
            children,
            onEnter: () => {
                paneReveal(this.content, true);
                paneClose(this.content, position);
            },
            onEntering: (isAppearing) => {
                setTimeout(_=>{
                    const { enter, appear } = timeout;
                    this.content.style.transition = `margin ${((isAppearing ? appear : enter)-10) / 1000}s`;
                    paneReveal(this.content);
                }, 10);

            },
            onEntered: () => {
                this.content.style.transition = null;
            },
            onExit: () => {
                paneReveal(this.content);
            },
            onExiting: () => {
                this.content.style.transition = `margin ${timeout.exit / 1000}s`;
                paneClose(this.content, position);
            },
            onExited: () => {
                this.content.style.transition = null;
                paneHide(this.content, position);
            }
        };
    }

    render() {
        const { transition, expand } = this.props;
        
        let content = (transition || expand) ? <div {...this.fetchPropsContent()} /> : null;

        if (transition) { content = <CSSTransition {...this.fetchPropsTransition(content)}/>; }

        return <div {...this.fetchProps()}>{content}</div>;
    }

}


export default Pane;