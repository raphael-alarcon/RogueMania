import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import tmxPath from "../../../res/first-level.tmx?url";
import tsxPath from "../../../res/tileset.tsx?url";
import tssxPath from "../../../res/tileset.tssx?url";

export const mapTest: TiledMapResource = new TiledMapResource(tmxPath);

const convertPath = mapTest.convertPath;
mapTest.convertPath = (originalPath, relativePath) => {
	if (relativePath.includes(".tmx")) {
		return tmxPath;
	}
	if (relativePath.includes(".tsx")) {
		return tsxPath;
	}
	if (relativePath.includes(".tssx")) {
		return tssxPath;
	}
	return convertPath(originalPath, relativePath);
};
