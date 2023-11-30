import { Direction, Status, directionUpdateMap } from "@/utils/Constants";
import { Position } from "../gamelogic/Position";
import { Sprite } from "../gamelogic/Sprite";
import { Map } from "../map/Map";
import { GameObject } from "./GameObject";

export abstract class MoveableObject extends GameObject {
	public status: Status;
	public direction: Direction;

	constructor(position: Position, sprite: Sprite, map: Map) {
		super(position, sprite, map);
		this.direction = Direction.DOWN;
		this.status = Status.IDLE;
	}

	abstract canMove(property: keyof Position, posUpdate: number): boolean;

	theoricalPosition(property: keyof Position, posUpdate: number): Position {
		const theoricalPosition: Position = new Position(this.position.x, this.position.y);
		theoricalPosition[property as keyof Position] += posUpdate;
		return theoricalPosition;
	}

	move(direction: Direction) {
		const [property, posUpdate] = directionUpdateMap[direction];
		this.position[property as keyof Position] += posUpdate;
	}

	isInBoundaries(theoricalPosition: Position, minPosition: Position, maxPosition: Position): boolean {
		return theoricalPosition.x >= minPosition.x && theoricalPosition.x <= maxPosition.x && theoricalPosition.y >= minPosition.y && theoricalPosition.y <= maxPosition.y;
	}
}
