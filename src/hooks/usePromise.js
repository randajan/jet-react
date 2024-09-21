import { useState, useEffect, useCallback } from "react";
import jet from "../index";

export const usePromise = (init, execute, deps)=>{
    if (!(deps instanceof Array)) { deps = undefined; }
    const [[status, result, error], set] = useState(["init", init]);

    const run = async (...args)=> {
        set(["loading", result]); //keep last value while loading
        try { 
            const newResult = await (jet.isRunnable(execute) ? execute(...args) : execute);
            set(["done", newResult]); //set new value
            return newResult;
        }
        catch(err) { 
            set(["error", result, err]); //keep last value after error
            throw err;
        } 
    }

    useEffect(_=>{ if (deps) { run(); } }, deps || []);

    return { status, result, error, run }
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
