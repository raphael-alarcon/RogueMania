import { Position } from "@game/gamelogic/Position";

export abstract class Entity {
	public sprite: HTMLImageElement = new Image();

	public position: Position;

	private SPRITE_SIZE: number = 32;

	constructor(sprite: string, size: number, position: Position) {
		this.sprite.src = sprite;
		this.SPRITE_SIZE = size;
		this.position = position;
		console.log("Entity created");
	}

	draw(context: CanvasRenderingContext2D): void {
		context.drawImage(
			this.sprite,
			this.position.x,
			this.position.y,
			this.SPRITE_SIZE,
			this.SPRITE_SIZE
		);
	}
}
