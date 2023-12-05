import { Map } from "@map/Map";

export class MapLoader {
	private data: number[][] = [];

	constructor(map: Map, data: any) {
		for (let i = 0; i < map.background.width; i++) {
			this.data.push([]);
			for (let j = 0; j < map.background.height; j++) {
				this.data[i].push(0);
			}
		}
	}
}
