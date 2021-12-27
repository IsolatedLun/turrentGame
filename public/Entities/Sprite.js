import { genNum } from "../utils/utils.js";
class Sprite {
    constructor(dim, hex, tag, assets) {
        this.id = Number(new Date().getMilliseconds() + genNum(500));
        this.x = dim.x;
        this.y = dim.y;
        this.width = dim.width;
        this.height = dim.height;
        this.hex = hex;
        this.tag = tag;
        this.asset = assets[tag];
        this.bounds = null;
        this.collider = null;
        this.toDelete = false;
        this.isHidden = false;
        this.isDisabled = false;
    }
    getDims() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
    update(ctx) {
    }
}
export default Sprite;
