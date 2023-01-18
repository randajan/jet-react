import { BaseSync, BaseAsync } from "@randajan/jet-base";
import { useEffect, useState } from "react";

function use(path) {
    const [[getChanges], setGetChanges] = useState([_=>[]]);
    useEffect(_=>this.watch(path, (get, cngs)=>setGetChanges([cngs])), [path]);
    return getChanges;
}

BaseSync.prototype.use = use;
BaseAsync.prototype.use = use;