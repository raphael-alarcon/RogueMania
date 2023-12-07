import { Actor, ActorArgs, CollisionGroupManager, Engine } from "excalibur";
import { AnimatableObject } from "@gamelogic/AnimatableObect";
import Container from "typedi";
import { GraphicService } from "../services/GraphicService";

export type ActorConfig = { tag: string; collisionGroupKey: string };

export abstract class GameObject extends Actor implements AnimatableObject {
	private graphicService: GraphicService = Container.get(GraphicService);

	abstract type: string;

	get frame(): number[] {
		return [0, 0];
	}

	constructor({ pos, collisionType, collider }: ActorArgs, { tag, collisionGroupKey }: ActorConfig) {
		super({
			pos: pos,
			collisionType: collisionType,
			collider: collider,
			collisionGroup: CollisionGroupManager.groupByName(collisionGroupKey) ? CollisionGroupManager.groupByName(collisionGroupKey) : CollisionGroupManager.create(collisionGroupKey),
		});
		this.addTag(tag);
	}

	public onInitialize(_engine: Engine): void {
		this.graphicService.registerActorGraphics(this.type, this);
		this.graphicService.registerActorAnimations(this.type, this);
	}
}
