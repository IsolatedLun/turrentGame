export class ItemStorage {
    constructor(maxAmt) {
        this.items = [];
        this.maxItems = maxAmt;
        this.items.length = this.maxItems;
    }
    storeItem(item) {
        if (!item.isStackable) {
            alert('not stackable');
        }
        else if (!this.items.includes(item)) {
            this.items.push({ item: item, amt: 1 });
        }
        else {
            const currItem = this.items.find((obj) => obj.itemName === item.itemName);
            currItem.amt += 1;
        }
    }
    getItems() {
        return this.items.filter(item => item !== null);
    }
}
