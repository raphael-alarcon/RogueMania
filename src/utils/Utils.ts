import { Animation, AnimationStrategy, FromSpriteSheetOptions, SpriteSheet } from "excalibur";
import { Direction, Status } from "./Constants";
import { ActorAnimationDirection, AnimationName } from "@/game/config/graphics/GraphicTypes";

export module Utils {
	export function isUndefined(x: any) {
		return !isDefined(x);
	}

	export function isDefined(x: any): boolean {
		return x !== null && x !== undefined;
	}

	export function first<T>(x: T[]): T {
		return x[0];
	}

	export function numericKeys(en: any): number[] {
		return Object.keys(en)
			.map((x) => parseInt(x))
			.filter((x) => !isNaN(x));
	}

	export function stringKeys(en: any): string[] {
		return Object.keys(en).filter((x) => isNaN(parseInt(x)));
	}

	export function getAllAnimations(spriteSheet: SpriteSheet, animationsNbFrames: any, destSize?: number): ActorAnimationDirection {
		spriteSheet.sprites.forEach((sprite) => {
			sprite.destSize = { width: destSize ?? sprite.width, height: destSize ?? sprite.height };
		});
		const animations: Partial<ActorAnimationDirection> = {};
		for (const animation of Utils.stringKeys(Status)) {
			for (const direction of Utils.stringKeys(Direction)) {
				animations[animation] = {
					...animations[animation],
					[direction]: getAnimationFromDirection(
						spriteSheet,
						Status[animation as AnimationName],
						Direction[direction as keyof typeof Direction],
						animationsNbFrames[animation as AnimationName]
					),
				};
			}
		}
		return animations as ActorAnimationDirection;
	}

	export function getAnimationFromDirection(spriteSheet: SpriteSheet, animation: Status, direction: Direction, nbFrames: number): Animation {
		const spriteSheetOptions: FromSpriteSheetOptions = {
			spriteSheet: spriteSheet,
			durationPerFrameMs: 200,
			frameCoordinates: Array.from({ length: nbFrames }, (_, i) => {
				return {
					x: i,
					y: animation + direction,
				};
			}),
			strategy: AnimationStrategy.PingPong,
		};
		return Animation.fromSpriteSheetCoordinates(spriteSheetOptions);
	}
}
