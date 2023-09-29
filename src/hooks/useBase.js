import { BaseSync, BaseAsync } from "@randajan/jet-base";
import { useEffect, useState } from "react";

function use(path) {
    const [[get, getChanges], setGetChanges] = useState([_=>[]]);
    useEffect(_=>this.watch(path, (get, cngs)=>setGetChanges([get, cngs])), [path]);
    return [ get, getChanges ];
}

BaseSync.prototype.use = use;
BaseAsync.prototype.use = use;