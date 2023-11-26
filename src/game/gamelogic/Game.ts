import { Player } from "@entities/player/Player";
import { Position } from "./Position";

export class Game {
	public context: CanvasRenderingContext2D | null;

	public player: Player;

	constructor(context: CanvasRenderingContext2D) {
		this.context = context;
		this.player = new Player(new Position(100, 100));
		console.log("Game created");
		this.start();
	}

	public start(): void {
		console.log("Game started");
		this.loop();
	}

	loop(): void {
		console.log("Game loop");
		window.requestAnimationFrame(this.loop.bind(this));
	}

	public stop(): void {
		console.log("Game stopped");
	}
}
