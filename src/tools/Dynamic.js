import { solid, virtuals } from '@randajan/props';

const fakeDiff = (duration, diff)=>Math.min(diff, Math.floor(duration / 5));

export class Dynamic {

  constructor(element, { style="top", init=0, start=0, end=100, unit="%", duration=5000 }) {
    let current = init;
    let isPending = false;
    let pending;

    element.style[style] = init+unit;

    const animate = async (duration, iterations, from=0, to=1)=>{
      const dur = duration/iterations;
      return element.animate( 
        { [style]:[Number.jet.fromRatio(from, start, end)+unit, Number.jet.fromRatio(to, start, end)+unit]},
        { iterations, duration:dur, fill:"forwards" }
      ).finished;
    }

    const _set = async (to)=>{
      if (to == current) { return; }

      const startPart = current%1;
      const endPart = to%1;

      const dir = current < to;
      const diff = fakeDiff(duration, Math.abs(current-to));
      const full = Math.floor(diff)-(startPart?1:0);

      if (Math.floor(current) === Math.floor(to)) {
        await animate(duration, 1, current%1, to%1);
      } else {
        const startDur = startPart ? duration*((dir?1-startPart:startPart)/diff) : 0;
        const endDur = endPart ? duration*((dir?endPart:1-endPart)/diff) : 0;

        if (startPart) { await animate(startDur, 1, startPart, dir?1:0); } //first turn is incomplete
        if (full > 0) { await animate(duration-startDur-endDur, full, dir?0:1, dir?1:0); } //whole turns
        if (endPart) { await animate(endDur, 1, dir?0:1, endPart); } //end turn is incomplete
      }

      current = to;
    };

    const set = async to=>{
      if (isPending) { pending = to; return; }
      pending = null;
      isPending = true;
      try { await _set(to);} catch(err) { console.warn(err); }
      isPending = false;
      if (pending != null) { return set(pending); }
    }
    
    solid(this, "element", element);
    virtuals(this, {
      current:_=>current,
      isPending:_=>isPending
    });

    solid(this, "set", set, false);
  }
}