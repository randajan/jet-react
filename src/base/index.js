import Base from "@randajan/jet-base";
import { useEffect, useState } from "react";

import page from "./page.js";
import screen from "./screen.js";
import client from "./client.js";


Base.prototype.use = function(path) {
    const [[getChanges], setGetChanges] = useState([_=>[]]);
    useEffect(_=>this.watch(path, (get, cngs)=>setGetChanges([cngs])), [path]);
    return getChanges;
}

export {
    page,
    screen,
    client
}