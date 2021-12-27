import { Dim, Vector2 } from "../utils/interfaces.js";
import { genNum } from "../utils/utils.js";

class Sprite {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    hex: string;
    asset: HTMLImageElement;
    bounds: Vector2 | null;
    collider: Sprite | null;
    tag: string;
    toDelete: boolean;
    isHidden: boolean;
    isDisabled: boolean;

    constructor(dim: Dim, hex: string, tag: string, assets: {}) {
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

    getDims(): Dim {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    update(ctx: CanvasRenderingContext2D) {

    }
}

export default Sprite;