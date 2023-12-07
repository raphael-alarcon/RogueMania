import { ImageSource, Sound } from "excalibur";
import { PlayerGraphics } from "@graphics/PlayerGraphics";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { mapTest } from "../map/MapResources";

type Resource = ImageSource | Sound | TiledMapResource;

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);

export const allRessources: Resource[] = [...playerImages, mapTest];
