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
                "./elements/Router.js"
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