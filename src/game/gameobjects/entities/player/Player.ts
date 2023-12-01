import { Position } from "@/game/gamelogic/Position";
import { Entity } from "@entities/Entity";
import { Sprite } from "@/game/gamelogic/Sprite";
import { Status, directionUpdateMap, keyboardActionMap } from "@/utils/Constants";
import { Camera } from "@/game/gamelogic/Camera";
import { getStartPositionOfCamera } from "@/utils/tools";
import { Map } from "@/game/map/Map";
import { ControllableObject } from "@gameobjects/ControllableObject";
import { Core } from "@/game/core/Core";

export class Player extends Entity implements ControllableObject {
	public camera: Camera;

	get frame(): number[] {
		let frameX: number = this.shouldBeAnimated() ? this.sprite.SPRITE_SIZE * this.sprite.currentAnimationFrame : 0;
		let frameY: number = this.status * this.sprite.SPRITE_SIZE + this.sprite.SPRITE_SIZE * this.direction;
		return [frameX, frameY];
	}

	public pressedKeys: {
		[key: string]: boolean;
	} = {
		ArrowUp: false,
		ArrowDown: false,
		ArrowRight: false,
		ArrowLeft: false,
	};

	constructor(sprite: Sprite, position: Position, map: Map, camera: Camera) {
		super(sprite, position, map);
		this.sprite.numberOfFrames -= 2;
		this.camera = camera;
		camera.position = getStartPositionOfCamera(this);
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
	}

	override update() {
		if (this.status == Status.MOVING) {
			for (let key in this.pressedKeys) {
				if (this.pressedKeys[key]) {
					this.handleMovement(key);
				}
			}
		}
	}

	handleKeyDown(event: KeyboardEvent) {
		if (Object.keys(keyboardActionMap).indexOf(event.key) == -1) return;
		this.pressedKeys[event.key] = true;
		this.direction = keyboardActionMap[event.key];
		this.status = Status.MOVING;
	}

	handleKeyUp(event: KeyboardEvent) {
		this.pressedKeys[event.key] = false;
		if (Object.values(this.pressedKeys).every((value) => !value)) {
			this.status = Status.IDLE;
			return;
		}
		this.direction = keyboardActionMap[Object.keys(this.pressedKeys).find((key) => this.pressedKeys[key])!];
	}

	shouldBeAnimated(): boolean {
		return this.status != Status.IDLE;
	}

	canMove(property: keyof Position, posUpdate: number): boolean {
		const minCoordinates: Position = new Position(0, 0);
		const maxCoordinates: Position = new Position(this.map.TOTAL_SIZE, this.map.TOTAL_SIZE);

		return this.isInBoundaries(this.theoricalPosition(property, posUpdate), minCoordinates, maxCoordinates);
	}

	handleMovement(key: string) {
		const [property, posUpdate] = directionUpdateMap[keyboardActionMap[key]];
		if (this.canMove(property, posUpdate)) {
			this.move(keyboardActionMap[key]);
		}
		if (this.camera.canMove(property, posUpdate)) {
			this.camera.move(keyboardActionMap[key]);
		}
	}

	//TODO: Refactor this function
	get positionOnScreen(): Position {
		const baseSpriteCoordinates: Position = new Position(this.camera.width / 2 - this.sprite.sizeOnScreen / 2, this.camera.height / 2 - this.sprite.sizeOnScreen / 2);

		let centerOfScreen: Position = new Position(this.camera.width / 2, this.camera.height / 2);

		// camera at max coordinates

		let coordinatesOnScreen: Position = { ...baseSpriteCoordinates };

		if (this.position.x - baseSpriteCoordinates.x < 0) {
			coordinatesOnScreen.x = this.position.x;
		}
		if (this.position.y - baseSpriteCoordinates.y < 0) {
			coordinatesOnScreen.y = this.position.y;
		}

		if (this.camera.x + this.camera.width / 2 - this.sprite.sizeOnScreen / 2 > this.camera.maxX) {
			coordinatesOnScreen.x = this.position.x - (this.map.TOTAL_SIZE - this.camera.width) - this.sprite.sizeOnScreen;
		}
		if (this.camera.y + this.camera.height / 2 - this.sprite.sizeOnScreen / 2 > this.camera.maxY) {
			coordinatesOnScreen.y = this.position.y - (this.map.TOTAL_SIZE - this.camera.height) - this.sprite.sizeOnScreen;
		}

		return coordinatesOnScreen;
	}

	override draw(context: CanvasRenderingContext2D): void {
		if (!context || !this.sprite.isLoaded) return;
		const [frameX, frameY]: number[] = this.frame;
		context.drawImage(
			this.sprite.sprite,
			frameX,
			frameY,
			this.sprite.SPRITE_SIZE,
			this.sprite.SPRITE_SIZE,
			this.positionOnScreen.x,
			this.positionOnScreen.y,
			this.sprite.SPRITE_SIZE * Core.SCALE,
			this.sprite.SPRITE_SIZE * Core.SCALE
		);
		context.strokeStyle = "red";
		context.lineWidth = 2;
		this.sprite.updateAnimationProgress();
	}
}
