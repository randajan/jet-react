import { useEffect, useMemo } from 'react';
import Modal from '../Provider/Modal';


export const usePop = (props) => {
    const modal = Modal.use();
    const pop = useMemo(_ => modal.addPop(props), []);
    useEffect(_=>(_=>pop.down()), []);
    return pop;
}

export default usePop;