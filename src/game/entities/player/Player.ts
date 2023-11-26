import { Position } from "@game/gamelogic/Position";
import { Entity } from "@game/entities/Entity";

export class Player extends Entity {
	constructor(position: Position, sprite: HTMLImageElement) {
		super(sprite, 32, new Position(position.x, position.y));
		console.log("Player created", this.sprite);
	}
}
