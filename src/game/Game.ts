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
		const playerStartPosition: Position = getStartPositionOfPlayer(playerSprite.SPRITE_SIZE, this.map);
		const camera = new Camera(new Position(0, 0), canvas.width, canvas.height, this.map);
		this.gameObjects.push(new Player(playerSprite, playerStartPosition, this.map, camera));
		this.camera = camera;
	}

	private gameLoop() {
		requestAnimationFrame(this.gameLoop.bind(this));
		this.gameFrameNumber++;
		this.updateMap();
		this.updateEntities();
		this.drawDebugInfo();
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

	private drawDebugInfo() {
		const debugMargin: number = 10;
		const fontsize: number = 20;
		this.context.font = fontsize + "px Arial";
		this.context.fillStyle = "white";
		this.context.fillText(`Player: x: ${this.gameObjects[0].position.x} y: ${this.gameObjects[0].position.y}`, debugMargin, fontsize + debugMargin);
		this.context.fillText(
			`Camera: x: ${this.camera.x} y: ${this.camera.y} x1: ${this.camera.x + this.camera.width} y1: ${this.camera.y + this.camera.height}`,
			debugMargin,
			fontsize * 2 + debugMargin
		);
		this.context.fillText(`Canvas size: w: ${this.context.canvas.width} h: ${this.context.canvas.height}`, debugMargin, fontsize * 3 + debugMargin);
	}
}
