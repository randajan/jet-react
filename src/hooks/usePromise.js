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