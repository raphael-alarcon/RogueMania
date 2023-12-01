import { Position } from "@/game/gamelogic/Position";

//#region Direction
export enum Direction {
	DOWN = 0,
	UP = 1,
	RIGHT = 2,
	LEFT = 3,
}

type DirectionMap = {
	[key in Direction]: [keyof Position, number];
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
	ATTACKING = 2,
	DEAD = 3,
	MOVING = 4,
}
//#endregion
