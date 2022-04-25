import jet from "@randajan/jet-core";



export default jet.define("Event", Event, {
    extendPrototype:{
        cut(ev, stopBubling=false) {
            if (!ev) { return; }
            if (ev.preventDefault) { ev.preventDefault(); }
            if (ev.stopBubbling && stopBubling) { ev.stopBubbling(); }
        },
    }
});