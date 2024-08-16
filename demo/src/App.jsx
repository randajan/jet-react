import React, { Component } from "react";
import { list } from "@randajan/jet-core/eachSync";

import { ReactComponent } from "../../dist/index.js";

import createRouter from "../../dist/dom/Router/Router";

import Modal from "../../dist/dom/Modal";
import Block from "../../dist/dom/Block/Block";
import Link from "../../dist/dom/Link/Link";

import { PropsInject } from "./tests/PropsInject/PropsInject.jsx";
import { TestForm } from "./tests/TestForm/TestForm.jsx";
import { Dragable } from "./tests/Dragable/Dragable.jsx";
import { TestArticle } from "./tests/TestArticle/TestArticle.jsx";
import { TestTable } from "./tests/TestTable/TestTable.jsx";

import Menu from "../../dist/dom/Menu/Menu";
import "../../dist/dom/Menu/Menu.css";
import { Router } from "./Router.js";

export default _=>{
    return (
        <Modal className="App" data-flags={ReactComponent.jet.flags(_=>_, "a")}>
            <div className="Hull">
                <Block className="header">
                    <Menu trigger="MENU" position="top-left">
                        {Router.mapRoutes((page, key)=><div key={key}><Link to={page.path}>{page.caption}</Link></div>)}
                    </Menu>
                </Block>
                <Router transition={1000} transitionPrefix={"page"}/>
            </div>           
            {/* <div>{ReactComponent.jet.flags(screen.get(), "A").join(" | ")}</div>*/}
        </Modal>
    )
}