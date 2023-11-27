import { getRandomInt } from "@/utils/tools";
import { Sprite } from "@gamelogic/Sprite";
import { Position } from "@gamelogic/Position";

export class Tileset {

    public readonly TILESET_SIZE: number;

    public tiles: {
        [key: string]: Tile;
    } = {};

    public sprite: Sprite;

    constructor(sprite: Sprite, size: number) {
        this.TILESET_SIZE = size;
        this.sprite = sprite;
    }
}

export class Tile {

    public readonly TEXTURE_SIZE: number;

    private _tileCoordinates: Position;
    tileCoordinates(): Position {
        const [x, y] = [this._tileCoordinates.x, this._tileCoordinates.y];
        return new Position(getRandomInt(x, x + 2)*this.TEXTURE_SIZE, getRandomInt(y, y + 2)*this.TEXTURE_SIZE);
    }

    constructor(size: number, tileCoordinates: Position) {
        this.TEXTURE_SIZE = size;
        this._tileCoordinates = tileCoordinates;
    }
}

export class TilesetRepository {

    //#region Tileset forest
    public readonly TILE_FOREST: Tileset = new Tileset(new Sprite("assets/tilesets/tileset_forest.png", 256), 16);
    
    constructor() {
        this.TILE_FOREST.tiles.grass = new Tile(this.TILE_FOREST.TILESET_SIZE, new Position(1, 5));
    }
    //#endregion

}