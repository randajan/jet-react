import { useRef, useState, useEffect } from 'react';
import jet from "@randajan/jet-core";

const useMove = (event, onMove, opt)=>{
  const [move, setMove] = useState(false);
  const ref = useRef();

  useEffect(_=>Element.jet[event](ref.current, (ev, bound)=>{
    if (bound.state !== "move") { setMove(bound.state === "start"); }
    jet.run(onMove, bound);
  }, opt), Array.jet.to(opt));

  return [ref, move];
}

export const useDrift = (onDrift, opt)=>useMove("drift", onDrift, opt);
export const useDrag = (onDrag, opt)=>useMove("drag", onDrag, opt);
export const useSwipe = (onSwipe, opt)=>useMove("swipe", onSwipe, opt);