import { Position } from "@game/gamelogic/Position";
import { Sprite } from "@gamelogic/Sprite";
import { Core } from "../core/Core";
import { getCenterOfCanvas } from "@/utils/tools";
import { Map } from "../map/Map";
import { AnimatableObject } from "../gamelogic/AnimatableObect";

export abstract class GameObject implements AnimatableObject {
	public position: Position;
	public sprite: Sprite;
	public map: Map;

	constructor(position: Position, sprite: Sprite, map: Map) {
		this.position = position;
		this.sprite = sprite;
		this.map = map;
	}

	get frame(): number[] {
		return [0, 0];
	}

	abstract update(): void;

	draw(context: CanvasRenderingContext2D | null) {
		if (!context || !this.sprite.isLoaded) return;
		const [frameX, frameY]: number[] = this.frame;
		const coordinatesOnScreen: Position = new Position(0, 0);
		context.drawImage(
			this.sprite.sprite,
			frameX,
			frameY,
			this.sprite.SPRITE_SIZE,
			this.sprite.SPRITE_SIZE,
			coordinatesOnScreen.x,
			coordinatesOnScreen.y,
			this.sprite.sizeOnScreen,
			this.sprite.sizeOnScreen
		);
		this.sprite.updateAnimationProgress();
	}
}
