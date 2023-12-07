import { Direction, Status, directionUpdateMap } from "@/utils/Constants";
import { ActorConfig, GameObject } from "./GameObject";
import { ActorArgs, Vector } from "excalibur";

export abstract class MoveableObject extends GameObject {
	public status: Status;
	public direction: Direction;

	constructor({ pos, collisionType, collider }: ActorArgs, { tag, collisionGroupKey }: ActorConfig) {
		super({ pos, collisionType, collider }, { tag, collisionGroupKey });
		this.direction = Direction.DOWN;
		this.status = Status.IDLE;
	}

	abstract canMove(property: keyof Vector, posUpdate: number): boolean;

	theoricalPosition(property: keyof Vector, posUpdate: number): Vector {
		const theoricalPosition: Vector = new Vector(this.pos.x, this.pos.y);
		theoricalPosition[property as "x" | "y"] += posUpdate;
		return theoricalPosition;
	}

	move(direction: Direction) {
		const [property, posUpdate] = directionUpdateMap[direction];
		this.pos[property as "x" | "y"] += posUpdate;
	}

	isInBoundaries(theoricalPosition: Vector, minPosition: Vector, maxPosition: Vector): boolean {
		return theoricalPosition.x >= minPosition.x && theoricalPosition.x <= maxPosition.x && theoricalPosition.y >= minPosition.y && theoricalPosition.y <= maxPosition.y;
	}
}
