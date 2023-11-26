import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@entities": path.resolve(__dirname, "./src/game/entities"),
			"@game": path.resolve(__dirname, "./src/game"),
		},
	},
});
