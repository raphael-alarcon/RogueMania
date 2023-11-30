import { GameObject } from "@gameobjects/GameObject";
import { TilesetRepository } from "@gamelogic/Tileset";
import { Camera } from "@gamelogic/Camera";
import { Position } from "@gamelogic/Position";
import { Core } from "../core/Core";
import { getOffset, getTilesBondaries } from "@/utils/tools";

export class Map {
	public tilesetRepository: TilesetRepository = new TilesetRepository();
	public _environmentElements: GameObject[] = [];
	private grassTiles: Position[] = [];
	public static TILE_SIZE: number = 16;
	public MAP_TILES: number = 100;
	public TOTAL_SIZE: number = this.MAP_TILES * Map.TILE_SIZE;

	constructor() {
		Map.TILE_SIZE *= Core.SCALE;
		this.setupMap();
	}

	setupMap() {
		for (let i = 0; i < this.MAP_TILES; i++) {
			for (let j = 0; j < this.MAP_TILES; j++) {
				const grassTile = this.tilesetRepository.TILE_FOREST.tiles.grass;
				this.grassTiles.push(grassTile.tileCoordinates());
			}
		}
	}

	drawBackground(context: CanvasRenderingContext2D, camera: Camera) {
		const backgroundTile = this.tilesetRepository.TILE_FOREST.tiles.grass;

		const [startTile, endTile]: [Position, Position] = getTilesBondaries(camera);

		const offset: Position = getOffset(camera, startTile);

		for (let i = startTile.x; i <= endTile.x; i++) {
			for (let j = startTile.y; j <= endTile.y; j++) {
				let tile = this.grassTiles[i * j];
				const x = (i - startTile.x) * Map.TILE_SIZE + offset.x;
				const y = (j - startTile.y) * Map.TILE_SIZE + offset.y;
				context.drawImage(
					this.tilesetRepository.TILE_FOREST.sprite.sprite,
					tile.x,
					tile.y,
					backgroundTile.TEXTURE_SIZE,
					backgroundTile.TEXTURE_SIZE,
					Math.round(x),
					Math.round(y),
					Map.TILE_SIZE,
					Map.TILE_SIZE
				);
			}
		}
	}

	placeEnvironmentElement(gameObject: GameObject) {
		this._environmentElements.push(gameObject);
	}
}
