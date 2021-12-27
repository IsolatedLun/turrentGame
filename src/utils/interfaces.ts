import { Item } from "../Items/Item.js";

export interface Dim {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Vector2 {
    x: number;
    y: number;
}

export interface Position extends Vector2 {
    uuid: number;
}

export interface Settings {
    screenX: number;
    screenY: number;
    debug: boolean;
    baseDir: string;
    tps: number;
}

export interface Asset {
    img: HTMLImageElement;
}

/* Items */
export interface ItemStack {
    item: Item;
    amt: number;
}