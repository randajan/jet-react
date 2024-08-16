import qs from "query-string";

import jet from "@randajan/jet-core";
import BaseSync from "@randajan/jet-base/sync";

class Tab extends BaseSync {

    constructor() {
        super((base)=>{

            let setTitle;
            
            this.fit("visible", _=>!document.hidden);
            document.addEventListener('visibilitychange', _=>this.set("visible"));
            
            this.set("title", document.title);

            base.watch("title", get=>{
                if (!setTitle) { document.title = get(); }
            });

            const ele = document.querySelector('title');
            const observer = new MutationObserver(mutations=>{
                setTitle = true;
                this.set("title", document.title);
                setTitle = false;
            });

            observer.observe(ele, { childList: true, subtree:true });

        });

    }

    close() {
        return window.close();
    }

}

export const page = new Tab();
export default page;