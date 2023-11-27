import { Position } from "@gamelogic/Position";
import { Map } from "@map/Map";

export class Camera {
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
		this.position = position;
		this.width = width;
		this.height = height;
		this.maxX = map.tsize * map.tsize - width;
		this.maxY = map.tsize * map.tsize - height;
	}

	isInBoundaries(position: Position): boolean {
		return position.x >= 0 && position.x <= this.maxX && position.y >= 0 && position.y <= this.maxY;
	}
}
