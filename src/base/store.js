import jet from "@randajan/jet-core";
import { BaseSync } from "@randajan/jet-base";

const _cc = "$$cookiesConsent";

const load = id=>jet.json.from(localStorage.getItem(id));
const save = (id, data)=>localStorage.setItem(id, jet.json.to(data));
const remove = id=>localStorage.removeItem(id);

class Store extends BaseSync {
    constructor() {

        super((base, config)=>{
            const id = config.id || "$$baseLocalStore";

            base.set(load(id));

            base.watch("", get=>{
                const data = get();
                if (!data) { return; }
                const cc = data[_cc];
                if (cc === true) { return save(id, data); }
                if (!Array.isArray(cc) || !cc.length) { return remove(id); }
                save(id, Object.jet.filter(data, (v, k)=>k === _cc || cc.includes(k)));
            });
        });
        
    }

    acceptAll() {
        return this.set(_cc, true);
    }

    accept(scopes=[]) {
        return this.set(_cc, scopes);
    }

    dismiss() {
        return this.remove(_cc);
    }
}


export default new Store();