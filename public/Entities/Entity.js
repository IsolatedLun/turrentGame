import Sprite from "./Sprite.js";
export class Entity extends Sprite {
    constructor(hp, speed, dim, hex, tag, assets) {
        super(dim, hex, tag, assets);
        this.health = hp;
        this.speed = speed;
        this.defSpeed = speed;
        this.sprintSpeed = speed * 2;
    }
    move(to_pos) {
        this.x += to_pos.x * this.speed;
        this.y += to_pos.y * this.speed;
        if (this.isOutOfBounds()) {
            this.x = this.bounds.x / 2;
            this.y = this.bounds.y / 2;
        }
    }
    update(ctx) {
        this.drawHealth(ctx);
        if (this.health < 1) {
        }
    }
    drawHealth(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 20, this.width, 4);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 20, (this.health / this.width) * 100, 4);
    }
    isOutOfBounds() {
        if (Math.abs(this.x) > this.bounds.x || Math.abs(this.y) > this.bounds.y) {
            return true;
        }
        else {
            return false;
        }
    }
}
