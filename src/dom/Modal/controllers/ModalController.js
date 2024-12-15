
import jet from "@randajan/jet-core";

import Pool from '@randajan/jet-core/pool';
import RunPool from '@randajan/jet-core/runpool';
import { PopController } from "./PopController";
import { solids } from "@randajan/props";


export class ModalController {

    constructor() {

        solids(this, {
            onChange: new RunPool().with(this),
            onUp: new RunPool().with(this),
            onDown: new RunPool().with(this),
            pops: solids({}, {
                all: new Pool().autoFilter(v=>v instanceof PopController),
                up: new Pool().autoFilter(v=>v instanceof PopController)
            })
        });

        this.onUp.add((_, pop) => this.pops.up.add(pop));
        this.onDown.add((_, pop) => this.pops.up.remove(pop));

    }

    addPop(props) {
        const { all } = this.pops;
        const pop = new PopController(this, all.length, props);
        all.add(pop);
        return pop;
    }

    getTop() { return this.pops.up[this.pops.up.length - 1]; }
    isTop(pop) { return this.getTop() === pop; }
    isUp(pop) { return pop ? this.pops.up.has(pop) : !!this.pops.up.length; }

}