import { Game } from "@game/Game";

export class Core {
	constructor(canvas: HTMLCanvasElement) {
		if (!canvas) {
			throw new Error("Could not get context");
		}
		Game.getInstance();
	}
}
