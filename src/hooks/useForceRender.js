import { useStateSafe } from './useStateSafe';
import jet from "../index";

export const useForceRender = _=>{
  const [state, render] = useStateSafe(0);
  return _=>render(state+1);
}


