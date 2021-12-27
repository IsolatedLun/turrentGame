import { Dim } from "../utils/interfaces.js";
import Sprite from "../Entities/Sprite.js";

export class Item extends Sprite {
    isCollectable: boolean;
    isConsumable: boolean;
    isStackable: boolean;
    isWeapon: boolean;
    description: string;
    itemType: 'food' | 'weapon';
    itemName: string;
    maxStack: number;

    constructor(desc: string, itemType: 'food' | 'weapon', itemName: string, maxStack: number,
        dim: Dim, hex: string, assets: {}) {

        super(dim, hex, itemName.toLowerCase(), assets);

        this.isCollectable = true;
        this.isConsumable = false;
        this.isWeapon = false;
        this.isStackable = true;
        this.description = desc;
        this.itemType = itemType;
        this.itemName = itemName;
        this.maxStack = maxStack;
    }
}