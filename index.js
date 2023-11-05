import slib from "@randajan/simple-lib";

slib(
    process.env.NODE_ENV !== "dev",
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
            },
            // external:[
            //     "@randajan/jet-core",
            //     "@randajan/jet-base",
            //     "react",
            //     "react-dom"
            // ],
        },
        demo:{
            loader:{".js":"jsx"},
            plugins:[]
        }
    }
)