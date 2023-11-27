import { Position } from "@gamelogic/Position";
import { Sprite } from "@gamelogic/Sprite";
import { EntityStatus, Direction, directionUpdateMap } from "@/utils/Constants";
import { GameObject } from "@gameobjects/GameObject";

export abstract class Entity extends GameObject {

	public direction: Direction = Direction.DOWN;
	public status: EntityStatus = EntityStatus.IDLE;
	public isMoving: boolean = false;

	constructor(sprite: Sprite, position: Position) {
		super(position, sprite);
		console.log("Entity created");
	}

	public create() {
		throw new Error("Method not implemented.");
	}

	override update() {
		if (this.status == EntityStatus.MOVING) {
			const [property, posUpdate]: [string, number] = directionUpdateMap[this.direction];
			this.position[property as keyof Position] += posUpdate;
		}
	}

	public die() {
		throw new Error("Method not implemented.");
	}

}
