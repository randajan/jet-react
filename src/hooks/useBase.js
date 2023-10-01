import { BaseSync, BaseAsync } from "@randajan/jet-base";
import { useEffect, useState } from "react";

BaseSync.prototype.use = function use(path) {
    const [ sugar ] = useState(_=>this.sugar(path));
    const [[getChanges], setGetChanges] = useState([_=>[]]);

    useEffect(_=>this.watch(path, (get, cngs)=>setGetChanges([cngs])), [path]);

    return [ sugar, getChanges ];
}

BaseAsync.prototype.use = function use(path) {
    const [ sugar ] = useState(_=>this.sugar(path));
    const [[getChanges], setGetChanges] = useState([_=>[]]);

    useEffect(_=>{
        const cleanUp = this.watch(path, (get, cngs)=>setGetChanges([cngs]));
        return _=>{ cleanUp.then(cleanUp=>cleanUp()); }
    }, [path]);

    return [ sugar, getChanges ];
}