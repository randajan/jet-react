import React from "react";
import { list } from "@randajan/jet-core/eachSync";

import screen from "../../dist/base/screen";
import page from "../../dist/base/page";
import tab from "../../dist/base/tab";

import createRouter from "../../dist/dom/Router/Router";

import Block from "../../dist/dom/Block/Block";

import { PropsInject } from "./tests/PropsInject/PropsInject.jsx";
import { TestForm } from "./tests/TestForm/TestForm.jsx";
import { Dragable } from "./tests/Dragable/Dragable.jsx";
import { TestArticle } from "./tests/TestArticle/TestArticle.jsx";
import { TestTable } from "./tests/TestTable/TestTable.jsx";

import "../../dist/dom/Menu/Menu.css";
import { TestField } from "./tests/TestField/TestField.jsx";
import { TestPops } from "./tests/TestPops/TestPops.jsx";
import { TestUsePromise } from "./tests/TestUsePromise/TestUsePromise.jsx";
import { TestUseStateSafe } from "./tests/TestUseStateSafe/TestUseStateSafe.jsx";
import { TestUseForceRender } from "./tests/TestUseForceRender/TestUseForceRender.jsx";
import { TestCounter } from "./tests/TestCounter/TestCounter.jsx";
import { TestUseRoute } from "./tests/TestUseRoute/TestUseRoute.jsx";
import { TestPane } from "./tests/TestPane/TestPane.jsx";

const pages = list({
    TestPane,
    TestArticle,
    Dragable,
    PropsInject,
    TestForm,
    TestTable,
    TestField,
    TestPops,
    TestUsePromise,
    TestUseStateSafe,
    TestUseForceRender,
    TestCounter,
    TestUseRoute
}, (Children, ctx)=>{
    const caption = ctx.key.replace(/([A-Z])/g, ' $1').trim();
    return {
        path:"/"+String.jet.camelCase(caption.toLowerCase()),
        caption,
        content:<Block caption={caption} children={<Children/>}/>
    }
});


export const Router = createRouter(pages);

let int, cnt = 0;
tab.watch("visible", get=>{
    const visible = get();
    clearInterval(int);
    if (visible) { return; }
    int = setInterval(_=>{
        cnt = cnt>=3 ? 0 : cnt+1;
        tab.set("title");
    }, 500);
})

tab.fit((next, v)=>{
    console.log(cnt);
    v = Object.jet.tap(v);

    const route = Router.matchRoute(page.get("pathname"));
    v.title = route?.caption || "Home";

    if (v.visible) { v.title = "😊 " + v.title; }
    else { v.title = "😴" + "z".repeat(cnt) + " " + v.title; }


    return v;
});

page.watch(_=>tab.set("title"));