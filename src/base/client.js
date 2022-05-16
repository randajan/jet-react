import { deviceType, browserName, browserVersion, fullBrowserVersion, mobileVendor, mobileModel, engineName, engineVersion } from 'react-device-detect';

import jet from "@randajan/jet-core";
import Base from "@randajan/jet-base";

class Client extends Base {

    constructor() {
        super();

        this.fit(_=>({
                deviceType,
                browserName,
                browserVersion,
                fullBrowserVersion,
                mobileVendor,
                mobileModel,
                engineName,
                engineVersion,
        }));
    }

}


let instance;
export default (debug)=>instance || (instance = new Client(debug));