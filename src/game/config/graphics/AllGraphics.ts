import { ImageSource, Sprite } from "excalibur";
import { PlayerGraphics } from "./PlayerGraphics";
import { ActorAnimationsDirections, ActorGraphic } from "@graphics/GraphicTypes";

export module AllGraphics {
	export const animations: ActorAnimationsDirections = {
		player: [
			{ name: "IDLE", animations: PlayerGraphics.animationsWithDirections.IDLE },
			{ name: "MOVING", animations: PlayerGraphics.animationsWithDirections.MOVING },
			{ name: "DEAD", animations: PlayerGraphics.animationsWithDirections.DEAD },
		],
	};

	export const actorTextures: ActorGraphic = {};

	function toSprite(imageSource: ImageSource): Sprite {
		return imageSource.toSprite();
	}
}
