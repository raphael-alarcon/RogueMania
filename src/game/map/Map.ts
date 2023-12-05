import { GameObject } from "@gameobjects/GameObject";
import { TilesetRepository } from "@gamelogic/Tileset";
import { Core } from "@game/core/Core";
import mapImage from "@assets/map/basemap.png";
import { Player } from "../gameobjects/entities/player/Player";
import { Camera, getCamera } from "@/utils/tools";
import { Position } from "@gamelogic/Position";
import mapData from "@assets/map/basemap.json";
import { Size } from "@gamelogic/Size";

export class Map {
	tilesetRepository: TilesetRepository = new TilesetRepository();
	_environmentElements: GameObject[] = [];
	background: HTMLImageElement = new Image();
	static TILE_SIZE: number = 16;
	isLoaded: boolean = false;
	player: Player | null = null;
	_data = mapData;

	get width(): number {
		return this.background.width;
	}
	get height(): number {
		return this.background.height;
	}

	getTile(position: Position): Position {
		return new Position(Math.floor(position.x / Map.TILE_SIZE), Math.floor(position.y / Map.TILE_SIZE));
	}

	getMapTileSize(): Size {
		return new Size(this.width / Map.TILE_SIZE, this.height / Map.TILE_SIZE);
	}

	constructor() {
		Map.TILE_SIZE *= Core.SCALE;
		this.setupMap();
	}

	setupMap() {
		this.background.src = mapImage;
		this.background.onload = () => {
			this.isLoaded = true;
		};
	}

	drawBackground(context: CanvasRenderingContext2D) {
		if (!this.isLoaded || !this.player) return;
		const camera: Camera = getCamera(this.player, context.canvas);
		context.drawImage(this.background, camera.x, camera.y, camera.width, camera.height, 0, 0, context.canvas.width, context.canvas.height);
	}

	placeEnvironmentElement(gameObject: GameObject) {
		this._environmentElements.push(gameObject);
	}
}
