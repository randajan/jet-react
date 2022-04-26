import jet from "@randajan/jet-core";

import { page, screen } from "./base/index.js";
import Element from "./primitive/Element.js";
import Event from "./primitive/Event.js";
import ReactElement from "./primitive/ReactElement.js";
import ReactComponent from "./primitive/ReactComponent.js";

import { useForceRender } from "./hooks/useForceRender.js";
import { useFocus } from "./hooks/useFocus.js";
import { useDrift, useDrag, useSwipe } from "./hooks/useDrift.js";

export default jet;
export {
    Element,
    Event,
    ReactComponent,
    ReactElement,
    screen,
    page,
    useForceRender,
    useFocus,
    useDrift,
    useDrag,
    useSwipe
}