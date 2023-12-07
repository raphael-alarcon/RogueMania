import { ImageSource, SpriteSheet } from "excalibur";
import { ActorAnimationDirection, ActorSpriteConfig, AnimationNumberFrames } from "./GraphicTypes";
import playerSpriteSheet from "@assets/player/charbase.png";
import { Utils } from "@/utils/Utils";

export module PlayerGraphics {
	const SPRITE_SIZE = 64;
	const DEST_SIZE = 48;

	const playerSpriteSheetSource: ImageSource = new ImageSource(playerSpriteSheet);

	const playerSheet: SpriteSheet = SpriteSheet.fromImageSource({
		image: playerSpriteSheetSource,
		grid: {
			rows: 8,
			columns: 8,
			spriteHeight: SPRITE_SIZE,
			spriteWidth: SPRITE_SIZE,
		},
	});

	export const sprites: Partial<ActorSpriteConfig> = {
		sheet: playerSpriteSheetSource,
	};

	export const animationsNbFrames: AnimationNumberFrames = {
		IDLE: 1,
		MOVING: 6,
		DEAD: 4,
		ATTACKING: 4,
	};

	export const animationsWithDirections: ActorAnimationDirection = Utils.getAllAnimations(playerSheet, animationsNbFrames, DEST_SIZE);
}
