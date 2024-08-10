import { useMemo, useEffect, useState } from 'react';

const init = _=>({isMounted:false});

export const useIsMounted = ()=>{
  const current = useMemo(init, []);
  
  useEffect(_=>{
    current.isMounted = true;
    return _=>(current.isMounted = false);
  }, []);
  
  return current;
}