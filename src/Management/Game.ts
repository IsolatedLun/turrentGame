import Sprite from "../Entities/Sprite.js";
import { Player } from "../Entities/Player.js";
import { Dim } from "../utils/interfaces.js";
import { collides } from "../utils/utils.js";
import { Manager } from "./Manager.js";
import { Entity } from "../Entities/Entity.js";

export class Game {
    manager: Manager;
    ctx: CanvasRenderingContext2D;
    sprites: Sprite[];
    positions: object;
    player: Player;
    boundX: number;
    boundY: number;

    constructor(manager: Manager, player: Player, ctx: CanvasRenderingContext2D) {
        this.sprites = [];
        this.positions = {};
        this.player = player;
        this.boundX = screen.availWidth;
        this.boundY = screen.availHeight;
        this.ctx = ctx;
        this.manager = manager;
    }

    // Renders the canvas and calls update function of the entity.
    render(): void {
        this.refresh();
        this.updateEntities();
    }

    refresh(): void {
        this.ctx.clearRect(0, 0, this.manager.settings.screenX, 
            this.manager.settings.screenY);
    }

    // Appends a entity to the game.
    instantiate(instance: any): void {
        instance.bounds = { x: this.manager.settings.screenX, 
            y: this.manager.settings.screenY };

        this.sprites.push(instance);
    }

    // Updates the positions of all objects.
    updatePos(entity: Sprite) {
        this.positions[entity.id] = { x: entity.x, y: entity.y }
    }

    // Updates all entities.
    updateEntities() {
        this.sprites.forEach(sprite => {
            if(!sprite.toDelete) {
                if(!sprite.isHidden) {
                    this.drawSprite(sprite);
                }

                sprite.update(this.ctx);
                
                this.updatePos(sprite);
                this.setCollider(sprite);                
            }

            else {
                this.destroy(sprite);
            }
                
        })
    }

    // Draws the sprite of a entity.
    drawSprite(sprite: Sprite): void {
        this.ctx.fillStyle = sprite.hex;
        this.ctx.drawImage(sprite.asset, sprite.x, sprite.y, 
            sprite.width, sprite.height);
    }

    // Updates the collider of an entity.
    setCollider(sprite: Sprite): void {
        this.getUniqueSprites(sprite.id).map((other) => {
            if(sprite instanceof Entity || other instanceof Entity) {
                const currDim: Dim = sprite.getDims();
                const otherDim: Dim = other.getDims();

                if(collides(currDim, otherDim)) {
                    other.collider = sprite;
                    return;
                }
            }

            sprite.collider = null;
            return;
        })

        
    }

    // Retrieve an entity by it's id.
    getSpriteById(id: number | string): Sprite {
        return this.sprites.filter(sprite => 
            sprite.id === Number(id))[0]
    }

    // Returns all entities that are not == to the param.
    getUniqueSprites(id: number | string): Sprite[] {
        return this.sprites.filter(sprite => (sprite.id !== Number(id)))
    }

    // Destroys an entity
    destroy(entity: Sprite): void {
        const idx = this.sprites.indexOf(entity);
        this.sprites.splice(idx, 1);
    }
}