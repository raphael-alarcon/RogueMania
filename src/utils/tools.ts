import { Player } from "@entities/player/Player";
import { Map } from "@map/Map";
import { Position } from "@gamelogic/Position";

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getCenterOfCanvas(canvas: HTMLCanvasElement): Position {
	return new Position(canvas.width / 2, canvas.height / 2);
}

export function getStartPositionOfPlayer(): Position {
	const startTile: Position = new Position(51, 78);
	console.log("Start tile: ", Map.TILE_SIZE);
	return new Position(startTile.x * Map.TILE_SIZE, startTile.y * Map.TILE_SIZE);
}

export type Camera = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export function getCamera(player: Player, canvas: HTMLCanvasElement): Camera {
	return {
		x: player.position.x - canvas.width / 2 + player.sprite.SPRITE_SIZE / 2,
		y: player.position.y - canvas.height / 2,
		width: canvas.width,
		height: canvas.height,
	};
}

export function getOffset(camera: any, startTile: Position): Position {
	return new Position(-camera.x + startTile.x * Map.TILE_SIZE, -camera.y + startTile.y * Map.TILE_SIZE);
}

export function worldToScreen(x: number, y: number, camera: any) {
	return { x: x - camera.x, y: y - camera.y };
}

export function screenToWorld(x: number, y: number, camera: any) {
	return { x: x + camera.x, y: y + camera.y };
}

export function isAtCenterOfScreen(position: Position, camera: any): boolean {
	const centerOfScreen: Position = getCenterOfCanvas(camera);
	return position.x == centerOfScreen.x && position.y == centerOfScreen.y;
}
