import slib from "@randajan/simple-lib";

slib(
    process.env.NODE_ENV !== "dev",
    {
        minify:false,
        external:[
            "@randajan/jet-core",
            "@randajan/jet-base",
            "react",
            "react-dom"
        ],
        demo:{
            loader:{".js":"jsx"},
            plugins:[]
        }
    }
)