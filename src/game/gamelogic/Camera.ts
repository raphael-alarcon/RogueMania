import { Position } from "@gamelogic/Position";
import { Map } from "@map/Map";
import { MoveableObject } from "../gameobjects/MoveableObject";

export class Camera extends MoveableObject {
	update(): void {
		throw new Error("Method not implemented.");
	}

	public position: Position;
	get x(): number {
		return this.position.x;
	}
	get y(): number {
		return this.position.y;
	}

	public width: number;
	public height: number;

	public maxX: number;
	public maxY: number;

	public zoom: number = 1;

	constructor(position: Position, width: number, height: number, map: Map) {
		super(position, Object.create(null), map);
		this.position = position;
		this.width = width;
		this.height = height;
		this.maxX = map.TOTAL_SIZE;
		this.maxY = map.TOTAL_SIZE;
	}

	canMove(property: keyof Position, posUpdate: number): boolean {
		return this.isInBoundaries(this.theoricalPosition(property, posUpdate), new Position(0, 0), new Position(this.maxX, this.maxY));
	}
}
