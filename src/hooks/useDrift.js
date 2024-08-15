import { useRef, useState, useEffect } from 'react';
import jet from "../index";

const useMove = (event, onMove, opt)=>{
  const [move, setMove] = useState(false);
  const ref = useRef();

  useEffect(_=>Element.jet[event](ref.current, (bound, id)=>{
    if (bound.state !== "move") { setMove(bound.state === "start"); }
    if (onMove) { onMove(bound, id); }
  }, opt), Array.jet.to(opt));

  return [ref, move];
}

export const useDrift = (onDrift, opt)=>useMove("drift", onDrift, opt);
export const useDrag = (onDrag, opt)=>useMove("drag", onDrag, opt);
export const useSwipe = (onSwipe, opt)=>useMove("swipe", onSwipe, opt);