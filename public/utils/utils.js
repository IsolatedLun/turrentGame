export function genNum(max) {
    return Math.floor(Math.random() * max);
}
export function collides(a, b) {
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y)
        return true;
}
