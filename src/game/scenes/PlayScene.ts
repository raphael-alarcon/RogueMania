import { ActorArgs, CollisionType, Scene, Shape, Vector, vec } from "excalibur";
import { Player } from "@entities/player/Player";
import { ActorFactory } from "@services/ActorFactory";
import { Container } from "typedi";
import { Game } from "../Game";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";

export class PlayScene extends Scene {
	private actorFactory: ActorFactory = Container.get(ActorFactory);

	private map: TiledMapResource;

	public onActivate(): void {
		this.map = Game.getInstance().map;
		this.map.addTiledMapToScene(this);
		const objects = this.map.data.getObjectLayerByName("Objects");
		const playerObject = objects.getObjectByName("Player");
		if (!playerObject) throw new Error("Player object not found");
		const player: Player = this.addPlayer(vec(playerObject.x, playerObject.y));
		this.camera.strategy.lockToActor(player);
		this.camera.zoom = 3;
	}

	private addPlayer(pos: Vector) {
		const args: ActorArgs = {
			pos: pos,
			collisionType: CollisionType.Active,
			collider: Shape.Box(this.map.data.tileWidth, this.map.data.tileHeight),
		};
		const player: Player = this.actorFactory.createPlayer(args);
		this.add(player);
		return player;
	}

	public onDeactivate(): void {
		this.clear();
	}
}
