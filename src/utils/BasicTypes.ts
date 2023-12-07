export type ParallaxType = "layer1" | "layer2" | "layer3" | "layer4";
export type ActorType = string;
export type DeviceSize = "small" | "medium" | "large";
export type SceneKeys = "playLevel";
export type DeviceGameConfig = { [key in DeviceSize]: GameConfig };

export type GameConfig = {
	size: {
		width: number;
		height: number;
	};
};
