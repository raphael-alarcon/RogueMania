import { Game } from "@game/Game";

export class Core {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D | null;

	public static readonly SCALE: number = 4;

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
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		console.log("Core setup", this.canvas, this.context);
	}
}
