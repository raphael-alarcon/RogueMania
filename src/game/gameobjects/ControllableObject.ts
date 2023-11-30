import { MoveableObject } from "@gameobjects/MoveableObject";

export abstract class ControllableObject extends MoveableObject {
	abstract handleMovement(key: string): void;
}
