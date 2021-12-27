import { Dim } from "./interfaces";

export function genNum(max: number) {
    return Math.floor(Math.random() * max);
}

export function collides(a: Dim, b: Dim) {
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) return true;
}