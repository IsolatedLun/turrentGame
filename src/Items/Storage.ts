import { ItemStack } from "../utils/interfaces.js";
import { Item } from "./Item.js";

export class ItemStorage {
    maxItems: number;
    items: any[];

    constructor(maxAmt: number) {
        this.items = [];
        this.maxItems = maxAmt;
        this.items.length = this.maxItems;
    }

    storeItem(item: Item) {
        if(!item.isStackable) {
            alert('not stackable');
        }

        else if(!this.items.includes(item)) {
            this.items.push({ item: item, amt: 1 })
        }

        else {
            const currItem = this.items.find((obj: Item) => obj.itemName === item.itemName);
            currItem.amt += 1;
        }
    }

    getItems(): ItemStack[] {
        return this.items.filter(item => item !== null);
    }
}