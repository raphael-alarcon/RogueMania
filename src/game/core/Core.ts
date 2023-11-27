import { Game } from "@game/Game";

export class Core {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D | null;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.setup();
		if (!this.context) {
			throw new Error("Could not get context");
		}
		new Game(this.context);
	}

	private setup(): void {
		this.canvas.width = window.innerWidth - 3;
		this.canvas.height = window.innerHeight - 3;
		console.log("Core setup", this.canvas, this.context);
	}
}
