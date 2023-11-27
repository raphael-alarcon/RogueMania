import { GameObject } from "@game/gameobjects/GameObject";
import { Player } from "@gameobjects/entities/player/Player";
import { Sprite } from "@gamelogic/Sprite";
import { Position } from "@gamelogic/Position";

import charbase from "@assets/player/charbase.png";
import { Map } from "./map/Map";
import { getStartPositionOfPlayer } from "@/utils/tools";
import { Camera } from "@gamelogic/Camera";

export class Game {
	private context: CanvasRenderingContext2D;
	private gameObjects: GameObject[] = [];
	private map: Map;
	private camera: Camera = Object.create(null);

	private gameFrameNumber: number = 0;

	constructor(context: CanvasRenderingContext2D) {
		this.context = context;
		this.context.imageSmoothingEnabled = false;
		this.map = new Map();
		this.initPlayer();
		this.gameLoop();
	}

	initPlayer() {
		const playerSprite: Sprite = new Sprite(charbase, 64);
		const canvas: HTMLCanvasElement = this.context.canvas;
		const playerStartPosition: Position = getStartPositionOfPlayer(canvas, playerSprite.SPRITE_SIZE);
		const camera = new Camera(new Position(0, 0), canvas.width, canvas.height, this.map);
		this.gameObjects.push(new Player(playerSprite, playerStartPosition, camera));
		this.camera = camera;
	}

	private gameLoop() {
		requestAnimationFrame(this.gameLoop.bind(this));
		this.gameFrameNumber++;
		this.updateMap();
		this.updateEntities();
	}

	private updateEntities() {
		this.gameObjects.forEach((gameObject: GameObject) => {
			gameObject.update();
			gameObject.draw(this.context);
		});
	}

	private updateMap() {
		this.map.drawBackground(this.context, this.camera);
	}
}
