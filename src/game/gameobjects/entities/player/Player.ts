import { Entity } from "@entities/Entity";
import { Status, directionUpdateMap, keyboardActionMap } from "@/utils/Constants";
import { ControllableObject } from "@gameobjects/ControllableObject";
import { ActorArgs, Engine, KeyEvent, Vector } from "excalibur";
import { ActorConfig } from "@gameobjects/GameObject";
import { ActorType } from "@/utils/BasicTypes";
import { AnimationConfigDirection } from "@/game/config/graphics/GraphicTypes";

export class Player extends Entity implements ControllableObject {
	type: ActorType = "player";

	animations: AnimationConfigDirection[];

	public pressedKeys: {
		[key: string]: boolean;
	} = {
		ArrowUp: false,
		ArrowDown: false,
		ArrowRight: false,
		ArrowLeft: false,
	};

	constructor({ pos, collisionType, collider }: ActorArgs, { tag, collisionGroupKey }: ActorConfig) {
		super({ pos, collisionType, collider }, { tag, collisionGroupKey });
	}

	public onInitialize(_engine: Engine): void {
		super.onInitialize(_engine);
		this.useRelevantAnimation();
		_engine.input.keyboard.on("press", (event) => this.handleKeyDown(event));
		_engine.input.keyboard.on("release", (event) => this.handleKeyUp(event));
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
		if (this.status == Status.MOVING) {
			for (let key in this.pressedKeys) {
				if (this.pressedKeys[key]) {
					this.handleMovement(key);
				}
			}
		}
	}

	handleKeyDown(event: KeyEvent) {
		if (Object.keys(keyboardActionMap).indexOf(event.key) == -1) return;
		this.pressedKeys[event.key] = true;
		this.direction = keyboardActionMap[event.key];
		this.status = Status.MOVING;
		this.useRelevantAnimation();
	}

	handleKeyUp(event: KeyEvent) {
		this.pressedKeys[event.key] = false;
		if (Object.values(this.pressedKeys).every((value) => !value)) {
			this.status = Status.IDLE;
			this.useRelevantAnimation();
			return;
		}
		this.direction = keyboardActionMap[Object.keys(this.pressedKeys).find((key) => this.pressedKeys[key])!];
	}

	handleMovement(key: string) {
		const [property, posUpdate] = directionUpdateMap[keyboardActionMap[key]];
		this.move(keyboardActionMap[key]);
	}

	canMove(property: keyof Vector, posUpdate: number): boolean {
		throw new Error("Method not implemented.");
	}
}
