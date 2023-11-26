import { Game } from "../gamelogic/Game";

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
		this.canvas.width = 800;
		this.canvas.height = 600;
		this.canvas.style.border = "1px solid black";
		console.log("Core setup", this.canvas, this.context);
	}
}
