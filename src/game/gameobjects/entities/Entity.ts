import { Position } from "@gamelogic/Position";
import { Sprite } from "@gamelogic/Sprite";
import { Status, Direction, directionUpdateMap } from "@/utils/Constants";
import { Map } from "@/game/map/Map";
import { MoveableObject } from "../MoveableObject";
import { AnimatableObject } from "@/game/gamelogic/AnimatableObect";

export abstract class Entity extends MoveableObject implements AnimatableObject {
	public direction: Direction = Direction.DOWN;
	public status: Status = Status.IDLE;
	public isMoving: boolean = false;

	constructor(sprite: Sprite, position: Position, map: Map) {
		super(position, sprite, map);
		console.log("Entity created");
	}

	public create() {
		throw new Error("Method not implemented.");
	}

	override update() {
		if (this.status == Status.MOVING) {
			const [property, posUpdate]: [string, number] = directionUpdateMap[this.direction];
			this.position[property as keyof Position] += posUpdate;
		}
	}

	public die() {
		throw new Error("Method not implemented.");
	}
}
