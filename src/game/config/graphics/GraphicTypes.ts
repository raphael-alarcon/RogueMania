import { Direction, Status } from "@/utils/Constants";
import { Graphic, ImageSource, Animation } from "excalibur";

export type ActorGraphic = {
	[key in string]: GraphicConfig[];
};

export type ActorSpriteConfig = {
	sheet: ImageSource;
} & {
	[key in GraphicName]: ImageSource;
};

export type AnimationName = keyof typeof Status;

export type ActorAnimation = { [key in AnimationName]: Animation };

export type GraphicConfig = { name: GraphicName; graphic: Graphic };
export type GraphicName = "hurt";

export type ActorAnimations = {
	[key in string]: AnimationConfig[];
};

export type AnimationConfig = { name: AnimationName; animation: Animation };

// With directions
export type ActorAnimationDirection = {
	[key in string]: Partial<{
		[key in Direction]: Animation;
	}>;
};

export type ActorAnimationsDirections = {
	[key in string]: AnimationConfigDirection[];
};

export type AnimationConfigDirection = { name: AnimationName; animations: DirectionToAnimation };

export type DirectionToAnimation = Partial<{
	[key in Direction]: Animation;
}>;

export type AnimationNumberFrames = {
	[key in AnimationName]: number;
};
