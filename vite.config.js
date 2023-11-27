import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@game": path.resolve(__dirname, "./src/game"),
			"@gameobjects": path.resolve(__dirname, "./src/game/gameobjects"),
			"@gamelogic": path.resolve(__dirname, "./src/game/gamelogic"),
			"@core": path.resolve(__dirname, "./src/game/core"),
			"@entities": path.resolve(__dirname, "./src/game/gameobjects/entities"),
			"@assets": path.resolve(__dirname, "./assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
	},
});
