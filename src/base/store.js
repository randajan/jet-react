import jet from "@randajan/jet-core";
import { BaseSync } from "@randajan/jet-base";

const { virtual } = jet.prop;

const _cc = "$$cookiesConsent";

const load = id=>jet.json.from(localStorage.getItem(id));
const save = (id, data)=>localStorage.setItem(id, jet.json.to(data));
const remove = id=>localStorage.removeItem(id);

class Store extends BaseSync {
    constructor() {
        let isSyncing = false;

        super((base, config)=>{
            const id = config.id || "$$baseLocalStore";

            base.watch("", get=>{
                if (isSyncing) { return; }
                const data = get();
                if (!data) { return; }
                const cc = data[_cc];
                if (cc === true) { return save(id, data); }
                if (!Array.isArray(cc) || !cc.length) { return remove(id); }
                save(id, Object.jet.filter(data, (v, k)=>k === _cc || cc.includes(k)));
            });

            this.refresh = _=>{
                isSyncing = true;
                base.set(load(id));
                isSyncing = false;
            }

            window.addEventListener("storage", this.refresh);

            base.set(load(id));
        });

        virtual(this, "isSyncing", _=>isSyncing);
        
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

    refresh() {
        return [];
    }
}


export default new Store();