import { useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';
import jet from "../index";


export const useStateSafe = (initState)=>{
  const c = useIsMounted();
  const int = useState(initState);
  c.setStateOrigin = int[1];

  int[1] = useCallback((nextState)=>{
    if (c.isMounted) { c.setStateOrigin(nextState); }
    return c.isMounted;
  });

  return int;
}
