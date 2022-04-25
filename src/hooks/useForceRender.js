import { useState, useEffect } from 'react';

const PRIVATE = []

export const useForceRender = _=>{
  const render = useState()[1];

  const id = useState(_=>PRIVATE.push({
    mount:false,
    rerender:_=>{ if (PRIVATE[id].mount) { render({}); } }
  })-1)[0];
  
  useEffect(_=>{
    PRIVATE[id].mount = true;
    return _=>PRIVATE[id].mount = false;
  }, []);
  
  return PRIVATE[id].rerender;
}


