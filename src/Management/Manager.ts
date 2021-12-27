import { Settings, Asset } from '../utils/interfaces.js'

export class Manager {
    settings: Settings;
    types: string[];
    assets: object;

    constructor() {
        this.settings = { screenX: 1280, debug: true, 
            screenY: 720, baseDir: '../', tps: 10
        };
        
        this.types = ['player', 'enemy', 'box', 'apple'];
        this.assets = {};
        this.createAssets();
    }

    createAssets() {
        this.types.forEach(type => {
            const img = new Image();
            img.src = this.settings.baseDir + '/images/' + type + '.png';
            this.assets[type] = img;
        })
    }
}