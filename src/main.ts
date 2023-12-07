import "reflect-metadata";

import { DeviceService } from "@services/DeviceService";
import { Container } from "typedi";
import { Engine, Loader, Scene } from "excalibur";
import { mapTest } from "./game/map/MapResources";
import { Core } from "./game/core/Core";

const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();

const canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#game");
if (!canvas) {
	throw new Error("Could not find canvas");
}
const core: Core = new Core(canvas);
