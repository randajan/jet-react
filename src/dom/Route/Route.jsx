import React from 'react';
import { cn } from '../../tools/css';
import "./Route.scss";

export const Route = (props) => {
    return (
        <div className={ cn("Route", props.className) }>
            {props.children}
        </div>
    )
}

export default Route;