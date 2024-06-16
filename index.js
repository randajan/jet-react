import slib, { argv } from "@randajan/simple-lib";

slib(
    argv.isBuild,
    {
        lib:{
            minify:false,
            entries:[
                "./index.js",
                "./base/page.js",
                "./base/screen.js",
                "./base/store.js",
                "./elements/dom/index.js",
            ],
            loader:{
                ".js":"jsx"
            }
        },
        demo:{
            loader:{".js":"jsx"},
            plugins:[]
        }
    }
)