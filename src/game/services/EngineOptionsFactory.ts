import { DisplayMode, EngineOptions, Input } from "excalibur";
import { Container, Service } from "typedi";
import { uiConfig } from "@services/DOMService";
import { GameConfigService } from "@services/GameConfigService";

@Service()
export class EngineOptionsFactory {
	private gameConfigService: GameConfigService = Container.get(GameConfigService);

	public buildOptions(): EngineOptions {
		const deviceConfig = this.gameConfigService.getDeviceConfig();
		const { width, height } = deviceConfig.size;
		return {
			width,
			height,
			displayMode: DisplayMode.FillScreen,
			canvasElementId: uiConfig.gameCanvaId,
			pointerScope: Input.PointerScope.Canvas,
		};
	}
}
