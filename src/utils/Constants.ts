//#region Direction
export enum Direction {
    DOWN = 0,
    UP = 1,
    RIGHT = 2,
    LEFT = 3
}

type DirectionMap = {
    [key in Direction]: [string, number];
};

const MOVEMENT_SPEED: number = 0.5;

export const directionUpdateMap: DirectionMap = {
    [Direction.DOWN]: ["y", MOVEMENT_SPEED],
    [Direction.UP]: ["y", -MOVEMENT_SPEED],
    [Direction.RIGHT]: ["x", MOVEMENT_SPEED],
    [Direction.LEFT]: ["x", -MOVEMENT_SPEED]
};
//#endregion

//#region Keyboard
type KeyboardDirection = {
    [key in string]: Direction;
};

export const keyboardActionMap: KeyboardDirection = {
    "ArrowDown": Direction.DOWN,
    "ArrowUp": Direction.UP,
    "ArrowRight": Direction.RIGHT,
    "ArrowLeft": Direction.LEFT
};
//#endregion

//#region Entity
export enum EntityStatus {
    IDLE = 0,
    ATTACKING = 2,
    DEAD = 3,
    MOVING = 4
}
//#endregion