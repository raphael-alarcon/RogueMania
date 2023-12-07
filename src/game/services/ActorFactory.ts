import { Service } from "typedi";
import { Player } from "@entities/player/Player";
import { ActorArgs } from "excalibur";
import { Tags } from "@config/Tags";
import { ActorConfig } from "@gameobjects/GameObject";

@Service()
export class ActorFactory {
	public createPlayer(actorArgs: ActorArgs): Player {
		const { ACTORS, COLLISION_GROUPS } = Tags;
		const actorConfig: ActorConfig = { tag: ACTORS.player, collisionGroupKey: COLLISION_GROUPS.player };
		return new Player(actorArgs, actorConfig);
	}
}
