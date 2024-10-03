import { useStateSafe } from './useStateSafe';
import jet from "../index";
import { useCallback } from 'react';

export const useForceRender = _=>{
  const render = useStateSafe()[1];
  return useCallback(_=>render(Symbol()));
}
