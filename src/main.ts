import { Core } from "./game/core/Core";

const canvas: HTMLCanvasElement | null =
	document.querySelector<HTMLCanvasElement>("#canvas");
if (!canvas) {
	throw new Error("Could not find canvas");
}
new Core(canvas);
