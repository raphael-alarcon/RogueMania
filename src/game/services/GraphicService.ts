import { Service } from "typedi";
import { Actor } from "excalibur";

import { AllGraphics } from "@graphics/AllGraphics";
import { AnimationConfigDirection, GraphicConfig } from "@graphics/GraphicTypes";
import { ActorType } from "@/utils/BasicTypes";

@Service()
export class GraphicService {
	public registerActorAnimations(actorType: ActorType, actor: Actor): void {
		const animationElement: AnimationConfigDirection[] = AllGraphics.animations?.[actorType];
		animationElement?.forEach(({ name, animations }) => {
			Object.entries(animations).forEach(([direction, animation]) => {
				actor.graphics.add(name + " " + direction, animation);
			});
		});
	}

	public registerActorGraphics(actorType: string, actor: Actor): void {
		const graphicInfo: GraphicConfig[] = AllGraphics.actorTextures[actorType];
		graphicInfo?.forEach(({ name, graphic }) => {
			actor.graphics.add(name, graphic);
		});
	}
}
