import jet from "@randajan/jet-core";

import Element from "./primitive/Element.js";
import Event from "./primitive/Event.js";
import ReactElement from "./primitive/ReactElement.js";
import ReactComponent from "./primitive/ReactComponent.js";

import { useForceRender } from "./hooks/useForceRender.js";
import { useFocus } from "./hooks/useFocus.js";
import { useDrift, useDrag, useSwipe } from "./hooks/useDrift.js";
import { usePromise } from "./hooks/usePromise.js";
import { useStateSafe } from "./hooks/useStateSafe.js";
import { useIsMounted } from "./hooks/useIsMounted.js";

import "./hooks/useBase";
import { cssTranslate, cn } from "./tools/css.js";


export default jet;
export {
    Element,
    Event,
    ReactComponent,
    ReactElement,
    cssTranslate,
    cn,
    useForceRender,
    usePromise,
    useFocus,
    useDrift,
    useDrag,
    useSwipe,
    useStateSafe,
    useIsMounted
}