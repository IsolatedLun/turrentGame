import { Entity } from "./Entity.js";
import { InputAxis } from "../utils/enums.js";
import { Dim, ItemStack } from "../utils/interfaces.js";
import { Item } from "../Items/Item.js";
import { ItemStorage } from "../Items/Storage.js";

export class Player extends Entity{
    keyMap: string[];
    inventory: ItemStorage;
    hotbar: ItemStorage;
    equipped: Item;
    isNearItem: boolean;
    uiInventory: HTMLDivElement;
    uiInvItems: HTMLUListElement;
    uiHotbarItems: HTMLDivElement;

    constructor(hp: number, speed: number, hex: string, tag: string, dim: Dim,  
        assets: object,) {
        super(hp, speed, dim, hex, tag, assets);

        this.inventory = new ItemStorage(32);
        this.hotbar = new ItemStorage(9);

        this.keyMap = [];
        this.equipped = this.hotbar[0];

        this.uiInventory = document.getElementById('player-inventory') as HTMLDivElement;
        this.uiInvItems = document.getElementById('player-items') as HTMLUListElement;
        this.uiHotbarItems = document.getElementById('player-hotbar-items') as HTMLDivElement;
    }

    /* Updates */
    override update(ctx: CanvasRenderingContext2D) {
        this.executeKeys();
        this.drawHealth(ctx);

        this.handleCollider(ctx);
    }

    updateInventory() {
        this.inventory.getItems().forEach((stack: ItemStack, idx: number) => {
            const img = this.uiInvItems.children[idx].children[0] as HTMLImageElement;
            img.src = stack.item.asset.src;
        })
    }

    updateHotbar(idx: number) {
        this.uiHotbarItems.children[Number(idx) - 1].classList.toggle('selected');
        this.changeEquipped(Number(idx))
    }

    changeEquipped(idx: number) {
        this.equipped = this.hotbar[idx - 1];
    }

    pickUpItem() {
        if(this.collider instanceof Item) {
            this.collider.toDelete = true;
            this.inventory.storeItem(this.collider);

            this.collider = null;
            this.updateInventory();
        }
    }

    handleClick() {                 // Weapon
        if(this.equipped instanceof Item) {
            document.body.style.padding = '10em';
        }
    }

    handleCollider(ctx: CanvasRenderingContext2D) {
        if(this.collider) {
            if(this.collider instanceof Item && !this.collider.isDisabled) {
                this.isNearItem = true;
                this.drawPickUp(ctx, this.collider.itemName);
            }
        } 
    }

    /* UI draws */
    drawPickUp(ctx: CanvasRenderingContext2D, itemName: string) {
        ctx.font = '1rem bold monospace'
        ctx.fillStyle = 'black';
        ctx.fillText(`PICK UP ${itemName} [E]`, this.x * 1.25, this.y * 2)
    }

    /* Controls */
    pushKey(code: string) {
        if(!this.keyMap.includes(code)) {
            this.keyMap.push(code)
        }
    }

    removeKey(code: string) {
        this.executeToBeRemovedKey(code);
        this.keyMap.splice(this.keyMap.indexOf(code), 1);
    }

    executeKeys() {
        this.keyMap.forEach(key => {
            switch(key) {
                case 'w':
                    this.move({x: 0, y: InputAxis.Up})
                    break;

                case 'a':
                    this.move({x: InputAxis.Left, y: 0})
                    break;

                case 's':
                    this.move({x: 0, y: InputAxis.Down})
                    break;

                case 'd':
                    this.move({x: InputAxis.Right, y: 0})
                    break;

                case 'e':
                    if(this.isNearItem)
                        this.pickUpItem();
                    break;

                case 'Shift':
                    this.speed = this.sprintSpeed;
                
                case 'LClick':
                    this.handleClick();
                    break;

                case 'i':
                    document.getElementById('player-inventory').classList.toggle('active');
                    break;

                case '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9':
                    this.updateHotbar(Number(key));
                    break;
            }
        })
    }

    executeToBeRemovedKey(key: string) {
        if(key === 'Shift')
            this.speed = this.defSpeed;
    }

}