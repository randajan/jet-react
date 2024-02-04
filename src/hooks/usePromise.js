import { useState, useEffect, useCallback } from "react";
import jet from "@randajan/jet-core";

export const usePromise = (init, pull, deps=[])=>{
    const [[status, data], set] = useState(["init", init]);

    const refresh = async _ => {
        if (!jet.isRunnable(pull)) { return; }
        set(["loading", data]); //keep last data while loading
        try { set(["done", await pull()]); } //set new data
        catch(err) { set(["error", data]); } //keep last data after error
    }

    useEffect(_=>{ refresh() }, deps||[]);

    return [data, status, refresh];
}


// function useEngage(set, cache, ...deps) {
//   const toEng = (next, prev, ...a)=>{
//     const eng = jet.eng.to(jet.fce.run(set, ...a));
//     if (!next || !next.pending) { return [eng, next]; }
//     next.cancel();
//     return [ eng, prev||next ];
//   };

//   const rerender = useForceRender();

//   const [ [ next, prev ], setEng ] = useState(toEng);

//   useEffect(_=>{ setEng(toEng(next, prev)); }, deps);

//   useEffect(_=>{
//     const { pending, end } = next;
//     if (!pending && cache && cache < (new Date() - end)) { setEng(toEng(next, prev)); }
//   });

//   useEffect(_=>{
//     next.finally(rerender);
//   }, [next]);

//   return [next, prev, (...a)=>setEng(toEng(next, prev, ...a))];
// }
