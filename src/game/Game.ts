import { SceneKeys } from "@/utils/BasicTypes";
import { EngineOptionsFactory } from "./services/EngineOptionsFactory";
import { PlayScene } from "./scenes/PlayScene";

import { Engine, EngineOptions, Loader } from "excalibur";

import { Container } from "typedi";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { allRessources } from "./config/AllRessources";
import { mapTest } from "./map/MapResources";

export class Game extends Engine {
	private static game: Game;

	map: TiledMapResource;

	private static scenesInfo: SceneInfo = {
		playLevel: { key: "playLevel", ctor: PlayScene },
	};

	static getInstance(): Game {
		if (!Game.game) {
			const engineOptionFactory: EngineOptionsFactory = Container.get(EngineOptionsFactory);
			const options: EngineOptions = engineOptionFactory.buildOptions();
			Game.game = new Game(options);
			Object.values(Game.scenesInfo).forEach(({ key, ctor }) => {
				Game.game.addScene(key, new ctor());
			});
			Game.game.startCustomLoader();
			Game.game.goToScene("playLevel");
			mapTest.addTiledMapToScene(Game.game.currentScene);
		}
		return Game.game;
	}

	constructor(options: EngineOptions) {
		super(options);
		this.map = mapTest;
	}

	public startCustomLoader() {
		const loader: Loader = new Loader(allRessources);
		this.logLoadingProgress(loader);
		return Game.getInstance().start(loader);
	}

	private logLoadingProgress(loader: Loader, timeout = 2000, interval = 100) {
		const progressLoggerElement: HTMLElement = document.getElementById("loader-progress") as HTMLElement;
		const progressLoggerContainerElement: HTMLElement = document.getElementById("loader-container") as HTMLElement;
		// repeatedly poll check
		const poller = setInterval(() => {
			const progressPercent: number = Math.trunc(loader.progress * 100);
			progressLoggerElement.textContent = `${progressPercent}%`;
			if (loader.isLoaded()) {
				clearInterval(poller);
				progressLoggerElement.style.display = "none";
				progressLoggerContainerElement.style.display = "none";
			}
		}, interval);
	}
}

type SceneInfo = { [key in SceneKeys]: { key: key; ctor: any } };
type GoToSceneConfig = { toScene: SceneKeys; fromScene?: SceneKeys };
