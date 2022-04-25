import jet from "@randajan/jet-core";
import Base from "@randajan/jet-base";

const SIZES = {
    width:[],
    height:[]
}

class Screen extends Base {

    constructor() {
        super();

        Object.defineProperties(this, {
            width:{get:_=>Math.max(document.documentElement.clientWidth, window.innerWidth)},
            height:{get:_=>Math.max(document.documentElement.clientHeight, window.innerHeight)}
        }, null, false, true);

        this.checkWidth(600, 960, 1280, 1920);
        this.checkHeight(300, 600, 920, 1280);

        window.addEventListener("resize", _=>this.set());

        this.fit(_=>{
            const r = {};
            for (let k in SIZES) {
                const d = SIZES[k], v = this[k];
                for (let i in d) { r[d[i]+k[0]] = v >= d[i]; };
            }
            return r;
        });

    }

    checkWidth(...sizes) { SIZES.width = [...SIZES.width, ...sizes].sort((a,b)=>a-b); this.set(); return this; }
    checkHeight(...sizes) { SIZES.height = [...SIZES.height, ...sizes].sort((a,b)=>a-b); this.set(); return this; }

    isSize(size) { return this.get(size); }

}


export default new Screen();