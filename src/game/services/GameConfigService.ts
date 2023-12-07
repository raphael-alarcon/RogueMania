import { Service } from "typedi";
import { GameConfig } from "@utils/BasicTypes";

@Service()
export class GameConfigService {
	public getDeviceConfig(): GameConfig {
		return {
			size: {
				width: window.innerWidth,
				height: window.innerHeight,
			},
		};
	}
}
