import { useState } from 'react';
import { useIsMounted } from './useIsMounted';


export const useStateSafe = (...a)=>{
  const c = useIsMounted();
  const int = useState(...a);
  
  const setStateOrigin = int[1];
  int[1] = (...a)=>{
    if (c.isMounted) { setStateOrigin(...a); }
    return c.isMounted;
  }
  
  return int;
}
