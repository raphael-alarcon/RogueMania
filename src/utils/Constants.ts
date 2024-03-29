import { Vector } from "excalibur";

//#region Direction
export enum Direction {
	DOWN,
	UP,
	RIGHT,
	LEFT,
}

type DirectionMap = {
	[key in Direction]: [keyof Vector, number];
};

export const MOVEMENT_SPEED: number = 1;

export const directionUpdateMap: DirectionMap = {
	[Direction.DOWN]: ["y", MOVEMENT_SPEED],
	[Direction.UP]: ["y", -MOVEMENT_SPEED],
	[Direction.RIGHT]: ["x", MOVEMENT_SPEED],
	[Direction.LEFT]: ["x", -MOVEMENT_SPEED],
};
//#endregion

//#region Keyboard
type KeyboardDirection = {
	[key: string]: Direction;
};

export const keyboardActionMap: KeyboardDirection = {
	ArrowDown: Direction.DOWN,
	ArrowUp: Direction.UP,
	ArrowRight: Direction.RIGHT,
	ArrowLeft: Direction.LEFT,
};
//#endregion

//#region Entity
export enum Status {
	IDLE = 0,
	ATTACKING,
	DEAD,
	MOVING = 4,
}
//#endregion
