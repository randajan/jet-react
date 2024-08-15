import { useRef, useEffect } from 'react';
import jet from "../index";

export const useFocus = (focus, setFocus, lock)=>{
  const ref = useRef();

  useEffect(_=>{
    if (lock || !ref) { return; }

    const handler = ev=>{
        const target = ev.target;
        const now = (ref.current && (ref.current === target || ref.current.contains(target)));
        if (!focus !== !now) { setFocus(now); }
    }

    if (focus) { return Element.jet.listen(document, "mouseup", handler); }
    else if (ref.current) { return Element.jet.listen(ref.current, "mouseup", handler); }


  }, [focus, lock]);

  return ref;
}