import { Map } from "@/game/map/Map";
import { Player } from "@entities/player/Player";
import { Position } from "@gamelogic/Position";

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getCenterOfCanvas(canvas: HTMLCanvasElement): Position {
	return new Position(canvas.width / 2, canvas.height / 2);
}

export function getStartPositionOfPlayer(canvas: HTMLCanvasElement, spriteSize: number): Position {
	return new Position(getCenterOfCanvas(canvas).x - spriteSize / 2, getCenterOfCanvas(canvas).y - spriteSize / 2);
}

export function getPositionOfCamera(player: Player): Position {
	return new Position(player.position.x - player.camera.width / 2 + player.sprite.SPRITE_SIZE / 2, player.position.y - player.camera.height / 2 + player.sprite.SPRITE_SIZE / 2);
}

export function getTilesBondaries(camera: any): [Position, Position] {
	const startTile: Position = new Position(Math.floor(camera.x / Map.TILE_SIZE), Math.floor(camera.y / Map.TILE_SIZE));
	const endTile: Position = new Position(startTile.x + camera.width / Map.TILE_SIZE, startTile.y + camera.height / Map.TILE_SIZE);
	return [startTile, endTile];
}

export function getOffset(camera: any, startTile: Position): Position {
	return new Position(-camera.x + startTile.x * Map.TILE_SIZE, -camera.y + startTile.y * Map.TILE_SIZE);
}

function worldToScreen(x: number, y: number, camera: any) {
	return { x: x - camera.x, y: y - camera.y };
}

function screenToWorld(x: number, y: number, camera: any) {
	return { x: x + camera.x, y: y + camera.y };
}
