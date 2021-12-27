import { Player } from './Entities/Player.js';
import { Game } from './Management/Game.js';
import { Dim } from './utils/interfaces.js';
import { Manager } from './Management/Manager.js';
import { Item } from './Items/Item.js';

const canvas = (document.getElementById('canvas') as HTMLCanvasElement)!;

const manager = new Manager();
canvas.width = manager.settings.screenX;
canvas.height = manager.settings.screenY;

const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

const playerDims: Dim = {x: 900, y: 20, width: 100, height: 100}
const player: Player = new Player(100, 4, 'blue', 'player', playerDims,
manager.assets);

const appleDims: Dim = {x: 500, y: 50, width: 60, height: 60}
const apple = new Item('an apple.', 'food', 'Apple', 64, appleDims, 'red',
manager.assets)

const boxDims: Dim = {x: 800, y: 90, width: 75, height: 60}
const box = new Item('a box.', 'weapon', 'Box', 1, boxDims, 'orange',
manager.assets)

const game = new Game(manager, player, ctx);

game.instantiate(box);
game.instantiate(apple);

game.instantiate(player);

function run() {
    setInterval(() => {
        game.render();
    }, manager.settings.tps)
}

run();


/* Event listeners */
window.addEventListener('keydown', (e) => { player.pushKey(e.key) })

window.addEventListener('mousedown', (e) => { player.pushKey('LClick') })

window.addEventListener('keyup', (e) => { player.removeKey(e.key) })