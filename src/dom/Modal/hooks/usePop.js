import { useEffect, useMemo } from 'react';
import Modal from '../Provider/Modal';


export const usePop = (props, hideOnUnmount=true) => {
    const modal = Modal.use();
    const cfg = useMemo(_ =>({pop:modal.addPop(props)}), []);
    cfg.hideOnUnmount = hideOnUnmount;
    useEffect(_=>(_=>{ if (cfg.hideOnUnmount) { cfg.pop.down(); } }), []);
    return cfg.pop;
}

export default usePop;