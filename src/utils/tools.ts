import { Vector } from "excalibur";

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getCenterOfCanvas(canvas: HTMLCanvasElement): Vector {
	return new Vector(canvas.width / 2, canvas.height / 2);
}

export type Camera = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export function worldToScreen(x: number, y: number, camera: any) {
	return { x: x - camera.x, y: y - camera.y };
}

export function screenToWorld(x: number, y: number, camera: any) {
	return { x: x + camera.x, y: y + camera.y };
}

export function isAtCenterOfScreen(position: Vector, camera: any): boolean {
	const centerOfScreen: Vector = getCenterOfCanvas(camera);
	return position.x == centerOfScreen.x && position.y == centerOfScreen.y;
}
