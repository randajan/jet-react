import qs from "query-string";

import jet from "@randajan/jet-core";
import BaseSync from "@randajan/jet-base/sync";

const parseQuery = (query, startChar="?")=>{
    if (Object.jet.is(query)) { return query; }
    query = String.jet.to(query, "&");
    query.startsWith(startChar) ? query.slice(1) : query;
    return {...qs.parse(query, {parseNumbers: true, parseBooleans: true})};
}

const buildQuery = query=>{
    if (Object.jet.is(query)) { return qs.stringify(query); }
    return String.jet.to(query);
}

class Page extends BaseSync {

    constructor() {
        super((base)=>{

            const loc = window.location;
            const his = window.history;
    
            let setFrom = true, setTo;

            base.fit("pathname", (next, v)=>next(setFrom ? loc.pathname : v));
            base.fit("search", (next, v)=>next(setFrom ? loc.search : v));
            base.fit("hash", (next, v)=>next(setFrom ? loc.hash : v));
            
            base.fit((next, v)=>{
                v = Object.jet.to(next(Object.jet.tap(v)));

                v.protocol = loc.protocol;
                v.hostname = loc.hostname;
                v.port = loc.port;
                v.origin = loc.origin;
                
                v.search = parseQuery(v.search, "?");
                v.hash = parseQuery(v.hash, "#");
                
                const search = buildQuery(v.search);
                const hash = buildQuery(v.hash);
    
                v.title = String.jet.to(v.title);
                v.pathname = String.jet.to(v.pathname);
                if (!v.pathname.startsWith("/")) { v.pathname = "/" + v.pathname; }
                
                v.path = v.pathname + (search ? "?"+search : "") + (hash ? "#"+hash : "");
                v.href = v.origin + v.path;
    
                return v;
            });
    
            base.watch("title", get=>document.title = get())
    
            base.watch("path", get=>{
                if (!setTo) {
                    setTo = true;
                    his[setFrom ? "replaceState" : "pushState"]({}, "", get());
                    setTo = false;
                }
            });
    
            const onHistoryChanged = window.onpopstate = _=>{
                if (!base.is("href", loc.href) && !setTo && !setFrom) {
                    setFrom = true;
                    base.set();
                    setFrom = false;
                }
            }
    
            for (const h of Object.keys(History.prototype)) {
                const orig = his[h];
                if (jet.isRunnable(orig)) {
                    his[h] = function(...a) {
                        const r = orig.call(this, ...a);
                        onHistoryChanged();
                        return r;
                    }
                }
            }
    
            setFrom = false;
        });
    }

}

export default new Page();