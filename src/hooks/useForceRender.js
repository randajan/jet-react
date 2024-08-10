import { useStateSafe } from './useStateSafe';

export const useForceRender = _=>{
  const [state, render] = useStateSafe(0);
  return _=>render(state+1);
}


