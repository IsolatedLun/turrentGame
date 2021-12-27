import { collides } from "../utils/utils.js";
import { Entity } from "../Entities/Entity.js";
export class Game {
    constructor(manager, player, ctx) {
        this.sprites = [];
        this.positions = {};
        this.player = player;
        this.boundX = screen.availWidth;
        this.boundY = screen.availHeight;
        this.ctx = ctx;
        this.manager = manager;
    }
    // Renders the canvas and calls update function of the entity.
    render() {
        this.refresh();
        this.updateEntities();
    }
    refresh() {
        this.ctx.clearRect(0, 0, this.manager.settings.screenX, this.manager.settings.screenY);
    }
    // Appends a entity to the game.
    instantiate(instance) {
        instance.bounds = { x: this.manager.settings.screenX,
            y: this.manager.settings.screenY };
        this.sprites.push(instance);
    }
    // Updates the positions of all objects.
    updatePos(entity) {
        this.positions[entity.id] = { x: entity.x, y: entity.y };
    }
    // Updates all entities.
    updateEntities() {
        this.sprites.forEach(sprite => {
            if (!sprite.toDelete) {
                if (!sprite.isHidden) {
                    this.drawSprite(sprite);
                }
                sprite.update(this.ctx);
                this.updatePos(sprite);
                this.setCollider(sprite);
            }
            else {
                this.destroy(sprite);
            }
        });
    }
    // Draws the sprite of a entity.
    drawSprite(sprite) {
        this.ctx.fillStyle = sprite.hex;
        this.ctx.drawImage(sprite.asset, sprite.x, sprite.y, sprite.width, sprite.height);
    }
    // Updates the collider of an entity.
    setCollider(sprite) {
        this.getUniqueSprites(sprite.id).map((other) => {
            if (sprite instanceof Entity || other instanceof Entity) {
                const currDim = sprite.getDims();
                const otherDim = other.getDims();
                if (collides(currDim, otherDim)) {
                    other.collider = sprite;
                    return;
                }
            }
            sprite.collider = null;
            return;
        });
    }
    // Retrieve an entity by it's id.
    getSpriteById(id) {
        return this.sprites.filter(sprite => sprite.id === Number(id))[0];
    }
    // Returns all entities that are not == to the param.
    getUniqueSprites(id) {
        return this.sprites.filter(sprite => (sprite.id !== Number(id)));
    }
    // Destroys an entity
    destroy(entity) {
        const idx = this.sprites.indexOf(entity);
        this.sprites.splice(idx, 1);
    }
}
