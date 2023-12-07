import { defineConfig } from "vite";
import path from "path";

const tiledPlugin = () => {
	return {
		name: "tiled-tileset-plugin",
		resolveId: {
			order: "pre",
			handler(sourceId, importer, options) {
				if (!sourceId.endsWith(".tsx")) return;
				return { id: "tileset:" + sourceId, external: "relative" };
			},
		},
	};
};

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@game": path.resolve(__dirname, "./src/game"),
			"@gameobjects": path.resolve(__dirname, "./src/game/gameobjects"),
			"@gamelogic": path.resolve(__dirname, "./src/game/gamelogic"),
			"@core": path.resolve(__dirname, "./src/game/core"),
			"@entities": path.resolve(__dirname, "./src/game/gameobjects/entities"),
			"@map": path.resolve(__dirname, "./src/game/map"),
			"@assets": path.resolve(__dirname, "./assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@config": path.resolve(__dirname, "./src/game/config"),
			"@graphics": path.resolve(__dirname, "./src/game/config/graphics"),
			"@services": path.resolve(__dirname, "./src/game/services"),
		},
	},
	assetsInclude: ["**/*.tmx"],
	server: {
		watch: {
			usePolling: true,
		},
	},
	plugins: [tiledPlugin()], // hint vite that tiled tilesets should be treated as external
	build: {
		assetsInlineLimit: 0, // excalibur cannot handle inlined xml in prod mode
		sourcemap: true,
	},
});
