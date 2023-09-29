import { BaseSync, BaseAsync } from "@randajan/jet-base";
import { useEffect, useState } from "react";

function use(path, autoGet=false) {
    const [[get, getChanges], setGetChanges] = useState([_=>{}, _=>[]]);
    useEffect(_=>this.watch(path, (get, cngs)=>setGetChanges([get, cngs])), [path]);
    return [ autoGet ? get() : get, getChanges ];
}

BaseSync.prototype.use = use;
BaseAsync.prototype.use = use;