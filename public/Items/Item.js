import Sprite from "../Entities/Sprite.js";
export class Item extends Sprite {
    constructor(desc, itemType, itemName, maxStack, dim, hex, assets) {
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
