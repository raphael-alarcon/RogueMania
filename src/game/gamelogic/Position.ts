export class Position {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static fromArray(position: [number, number]): Position {
		return new Position(position[0], position[1]);
	}
}
