import { Status, Direction } from "@/utils/Constants";
import { MoveableObject } from "../MoveableObject";
import { AnimatableObject } from "@/game/gamelogic/AnimatableObect";
import { ActorArgs, Engine } from "excalibur";
import { ActorConfig } from "@gameobjects/GameObject";

export abstract class Entity extends MoveableObject implements AnimatableObject {
	public direction: Direction = Direction.DOWN;
	public status: Status = Status.IDLE;
	public isMoving: boolean = false;

	constructor({ pos, collisionType, collider }: ActorArgs, { tag, collisionGroupKey }: ActorConfig) {
		super({ pos, collisionType, collider }, { tag, collisionGroupKey });
	}

	public onInitialize(_engine: Engine): void {
		super.onInitialize(_engine);
	}

	public useRelevantAnimation(): void {
		this.graphics.use(Status[this.status] + " " + Direction[this.direction]);
	}
}
