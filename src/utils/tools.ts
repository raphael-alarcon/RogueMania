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

export function getStartPositionOfPlayer(spriteSize: number, map: Map): Position {
	return new Position(map.TOTAL_SIZE / 2 - spriteSize / 2, map.TOTAL_SIZE / 2 - spriteSize / 2);
}

export function getStartPositionOfCamera(player: Player): Position {
	const cameraPosition: Position = new Position(player.position.x + player.sprite.sizeOnScreen - player.camera.width / 2, player.position.y + player.sprite.sizeOnScreen - player.camera.height / 2);
	Object.entries(cameraPosition).forEach(([key, value]) => {
		if (value < 0) cameraPosition[key as keyof Position] = 0;
	});
	return cameraPosition;
}

export function getTilesBondaries(camera: any): [Position, Position] {
	const startTile: Position = new Position(Math.floor(camera.x / Map.TILE_SIZE), Math.floor(camera.y / Map.TILE_SIZE));
	const endTile: Position = new Position(startTile.x + camera.width / Map.TILE_SIZE, startTile.y + camera.height / Map.TILE_SIZE + 1);
	return [startTile, endTile];
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
