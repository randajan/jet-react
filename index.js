import slib, { argv } from "@randajan/simple-lib";
import { sassPlugin } from 'esbuild-sass-plugin';

slib(
    argv.isBuild,
    {
        loader:{
            ".js":"jsx",
            '.png': 'file',
            ".jpg": "file",
            ".gif": "file",
            ".eot": "file",
            ".woff": "file",
            ".ttf": "file",
            ".svg": "file"
        },
        plugins: [
            sassPlugin()
        ],
        lib:{
            minify:false,
            entries:[
                "./index.js",
                "./base/page.js",
                "./base/screen.js",
                "./base/store.js",
                "./base/tab.js",
                "./dom/Article/Article.jsx",
                "./dom/Block/Block.jsx",
                "./dom/Caption/Caption.jsx",
                "./dom/Img/Img.jsx",
                "./dom/Tile/Tile.jsx",
                "./dom/Modal/index.js",
                "./dom/Hub/Hub.jsx",
                "./dom/Router/Router.jsx",
                "./dom/Link/Link.jsx",
                "./dom/Table/Table.jsx",
                "./dom/Menu/Menu.jsx",
                "./dom/Trigger/Trigger.jsx",
                "./dom/Pane/Pane.jsx",
                "./dom/Form/index.js",
                "./dom/Counter/Counter.jsx"
            ],
        },
        demo:{
            loader:{".js":"jsx"},
            plugins:[]
        }
    }
)